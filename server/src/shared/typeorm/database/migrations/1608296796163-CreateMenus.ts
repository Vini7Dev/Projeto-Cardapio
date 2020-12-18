/**
 * Migration - Menus Table
 */

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateMenus1608296796163 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'menus',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isPrimary: true,
                },
                {
                    name: 'code',
                    type: 'int',
                    generationStrategy: 'increment',
                    isGenerated: true,
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('menus');
    }
}
