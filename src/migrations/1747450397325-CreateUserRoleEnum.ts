import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleEnum1747450397325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM ('ADMIN', 'USER')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
