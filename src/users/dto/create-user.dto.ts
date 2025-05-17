import { IsEnum, IsString } from 'class-validator';
import { UserRoleEnum } from '../enum/user-role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
