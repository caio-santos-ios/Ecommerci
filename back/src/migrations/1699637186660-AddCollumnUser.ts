import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCollumnUser1699637186660 implements MigrationInterface {
    name = 'AddCollumnUser1699637186660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountValided" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountValided"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationToken"`);
    }

}
