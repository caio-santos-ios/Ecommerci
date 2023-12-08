import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImg1699446123483 implements MigrationInterface {
    name = 'AddImg1699446123483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
