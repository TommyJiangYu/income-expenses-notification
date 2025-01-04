import { MigrationInterface, QueryRunner } from "typeorm";

export class EditUserLineIdColumnToUnique1735895162908 implements MigrationInterface {
    name = 'EditUserLineIdColumnToUnique1735895162908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_2d700e2ba30d305d584a7e56cd\` (\`line_user_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_2d700e2ba30d305d584a7e56cd\``);
    }

}
