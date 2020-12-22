/**
 * Migration - Add Restaurants Id In Items
 */

import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddRestaurantIdInItems1608661544307
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'items',
            new TableColumn({
                name: 'restaurant_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'items',
            new TableForeignKey({
                name: 'items_restaurant_id',
                columnNames: ['restaurant_id'],
                referencedTableName: 'restaurants',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items', 'items_restaurant_id');

        await queryRunner.dropColumn('items', 'restaurant_id');
    }
}
