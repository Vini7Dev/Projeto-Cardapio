/**
 * Migration - Restaurants Foreign Key (Menu Id)
 */

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RestaurantsForeignKeyMenuId1608297307742
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'restaurants',
            new TableForeignKey({
                name: 'restaurants_menu_id',
                columnNames: ['menu_id'],
                referencedTableName: 'menus',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('restaurants', 'restaurants_menu_id');
    }
}
