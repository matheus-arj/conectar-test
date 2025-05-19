import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './entities/audit.entity';

@Injectable()
export class AuditRepository extends Repository<Audit> {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
  ) {
    super(
      auditRepository.target,
      auditRepository.manager,
      auditRepository.queryRunner,
    );
  }

  public async createAudit(userId: string, action: string): Promise<Audit> {
    const audit = this.auditRepository.create({
      userId,
      action,
    });
    return await this.save(audit);
  }

  async findInactiveUsers(daysInactive: number = 30): Promise<string[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysInactive);

    const result = await this.auditRepository
      .createQueryBuilder('audit')
      .select('audit.userId')
      .where('audit.action = :action', { action: 'LOGIN' })
      .andWhere('audit.createdAt <= :cutoffDate', { cutoffDate })
      .groupBy('audit.userId')
      .getRawMany();
    return result.map((row) => row.audit_userId);
  }
}
