import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class FindUsersDto {
  @ApiPropertyOptional({ example: 'ADMIN', enum: ['ADMIN', 'USER'] })
  @IsOptional()
  @IsEnum(['ADMIN', 'USER'], {
    message: 'O role deve ser ADMIN ou USER',
  })
  role?: 'ADMIN' | 'USER';

  @ApiPropertyOptional({ example: 'name', enum: ['name', 'createdAt'] })
  @IsOptional()
  @IsIn(['name', 'createdAt'], {
    message: 'sortBy deve ser name ou createdAt',
  })
  sortBy?: 'name' | 'createdAt';

  @ApiPropertyOptional({ example: 'asc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'sortOrder deve ser asc ou desc',
  })
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page deve ser um número inteiro' })
  @Min(1, { message: 'page deve ser no mínimo 1' })
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'perPage deve ser um número inteiro' })
  @Min(1, { message: 'perPage deve ser no mínimo 1' })
  perPage?: number;
}
