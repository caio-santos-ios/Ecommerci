import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1699385674452 implements MigrationInterface {
    name = 'InitialMigration1699385674452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '100', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
