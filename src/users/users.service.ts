import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HashPasswordHelper } from 'src/helpers/hash-password.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRoleEnum } from './enum/user-role.enum';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  @Inject(UsersRepository)
  private readonly usersRepository: UsersRepository;
  @Inject(HashPasswordHelper)
  private readonly hashPasswordHelper: HashPasswordHelper;

  public async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkIfEmailExists(createUserDto.email);
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.role = createUserDto.role || UserRoleEnum.USER;

    return await this.usersRepository.createUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return this.hashPasswordHelper.hashPassword(password);
  }

  private async checkIfEmailExists(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) throw new BadRequestException('Email already exists');
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  public async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    if (updateUserDto.email) {
      await this.checkIfEmailExists(updateUserDto.email);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.updateUser(id, user);
  }

  public async delete(id: string): Promise<User> {
    return await this.usersRepository.delete(id);
  }
}
