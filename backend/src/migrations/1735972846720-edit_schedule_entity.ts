import { MigrationInterface, QueryRunner } from "typeorm";

export class EditScheduleEntity1735972846720 implements MigrationInterface {
    name = 'EditScheduleEntity1735972846720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`detail\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`schedule_time\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`repeat_pattern\` enum ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`reminder_time\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`reminder_time\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`repeat_pattern\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`schedule_time\` varchar(255) CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`detail\` text CHARACTER SET "latin1" COLLATE "latin1_swedish_ci" NOT NULL`);
    }

}
