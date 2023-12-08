import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterIsAdmin1699298370681 implements MigrationInterface {
    name = 'AlterIsAdmin1699298370681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdmin" DROP DEFAULT`);
    }

}
