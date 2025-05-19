import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRoleEnum } from './enum/user-role.enum';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    const user: Partial<User> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || UserRoleEnum.USER,
    };

    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public findAndCount({
    role,
    sortBy,
    sortOrder,
    skip,
    take,
  }: {
    role?: 'ADMIN' | 'USER';
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    skip: number;
    take: number;
  }): Promise<[User[], number]> {
    const query = this.createQueryBuilder('user');

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    query.orderBy(`user.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    query.skip(skip).take(take);

    return query.getManyAndCount();
  }

  public async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  public async updateUser(
    id: string,
    data: Partial<CreateUserDto>,
  ): Promise<User> {
    await this.usersRepository.update(id, data);
    return await this.findById(id);
  }

  public async deleteUser(id: string): Promise<User> {
    const user = await this.findById(id);
    await this.usersRepository.delete(id);
    return user;
  }
}
