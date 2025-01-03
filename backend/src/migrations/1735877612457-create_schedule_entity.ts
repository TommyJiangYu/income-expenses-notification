import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScheduleEntity1735877612457 implements MigrationInterface {
    name = 'CreateScheduleEntity1735877612457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`detail\` text NOT NULL, \`schedule_time\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`schedule\``);
    }

}
