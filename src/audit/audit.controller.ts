import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserRoleEnum } from 'src/users/enum/user-role.enum';
import { AuditService } from './audit.service';

@ApiTags('audit')
@ApiBearerAuth()
@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('inactive-users')
  @Roles(UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Lista usuários inativos' })
  @ApiQuery({
    name: 'daysInactive',
    required: false,
    description: 'Quantidade de dias de inatividade para filtrar usuários',
    example: 30,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de IDs dos usuários inativos',
    schema: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  async findInactiveUsers(@Query('daysInactive') daysInactive?: number) {
    const days = daysInactive ?? 30;
    return this.auditService.findInactiveUsers(days);
  }
}
