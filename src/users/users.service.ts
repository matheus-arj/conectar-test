import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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

    return this.usersRepository.createUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return this.hashPasswordHelper.hashPassword(password);
  }

  private async checkIfEmailExists(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) throw new BadRequestException('Email already exists');
  }
}
