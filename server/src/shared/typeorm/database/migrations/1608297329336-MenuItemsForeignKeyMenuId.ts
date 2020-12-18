/**
 * Migration - Menu Items Foreign Key (Menu Id)
 */

import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class MenuItemsForeignKeyMenuId1608297329336 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'menu_items',
            new TableForeignKey({
                name: 'menu_items_menu_id',
                columnNames: ['menu_id'],
                referencedTableName: 'menus',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('menu_items', 'menu_items_menu_id');
    }
}
