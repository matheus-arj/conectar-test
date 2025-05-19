import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleEnum } from '../enum/user-role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'João da Silva' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: 'joao@email.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ example: 'novaSenha123' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiPropertyOptional({ example: 'ADMIN', enum: UserRoleEnum })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role: UserRoleEnum;
}
