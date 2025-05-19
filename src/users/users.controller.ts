import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleEnum } from './enum/user-role.enum';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Post()
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os usuários (apenas ADMIN)' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filtrar por nome ou email',
  })
  @ApiResponse({ status: 200, description: 'Usuários retornados com sucesso.' })
  @ApiResponse({ status: 403, description: 'Acesso negado. Apenas ADMIN.' })
  findAll(@Query() query: FindUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para atualizar este usuário.',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
