import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsEnum(['ADMIN', 'USER'], {
    message: 'O role deve ser ADMIN ou USER',
  })
  role?: 'ADMIN' | 'USER';

  @IsOptional()
  @IsIn(['name', 'createdAt'], {
    message: 'sortBy deve ser name ou createdAt',
  })
  sortBy?: 'name' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'sortOrder deve ser asc ou desc',
  })
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page deve ser um número inteiro' })
  @Min(1, { message: 'page deve ser no mínimo 1' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'perPage deve ser um número inteiro' })
  @Min(1, { message: 'perPage deve ser no mínimo 1' })
  perPage?: number;
}
