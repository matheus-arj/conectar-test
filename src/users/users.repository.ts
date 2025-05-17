import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRoleEnum } from './enum/user-role.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

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

  public async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
