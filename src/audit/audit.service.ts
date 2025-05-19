// src/audits/audits.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { AuditRepository } from './audit.repository';

@Injectable()
export class AuditService {
  @Inject(AuditRepository)
  private readonly auditRepository: AuditRepository;

  public async create(userId: string, action: string) {
    return await this.auditRepository.createAudit(userId, action);
  }

  public async findInactiveUsers(daysInactive: number = 30): Promise<string[]> {
    const inactiveUsers =
      await this.auditRepository.findInactiveUsers(daysInactive);
    return inactiveUsers;
  }
}
