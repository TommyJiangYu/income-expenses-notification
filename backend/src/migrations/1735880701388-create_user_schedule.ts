import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSchedule1735880701388 implements MigrationInterface {
    name = 'CreateUserSchedule1735880701388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_schedule\` (\`user_id\` int NOT NULL, \`schedule_id\` int NOT NULL, INDEX \`IDX_ed398d25ddca913e979a0fca21\` (\`user_id\`), INDEX \`IDX_f521c2a30965fe92253d2876ff\` (\`schedule_id\`), PRIMARY KEY (\`user_id\`, \`schedule_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_schedule\` ADD CONSTRAINT \`FK_ed398d25ddca913e979a0fca21f\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_schedule\` ADD CONSTRAINT \`FK_f521c2a30965fe92253d2876ffb\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_schedule\` DROP FOREIGN KEY \`FK_f521c2a30965fe92253d2876ffb\``);
        await queryRunner.query(`ALTER TABLE \`user_schedule\` DROP FOREIGN KEY \`FK_ed398d25ddca913e979a0fca21f\``);
        await queryRunner.query(`DROP INDEX \`IDX_f521c2a30965fe92253d2876ff\` ON \`user_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_ed398d25ddca913e979a0fca21\` ON \`user_schedule\``);
        await queryRunner.query(`DROP TABLE \`user_schedule\``);
    }

}
