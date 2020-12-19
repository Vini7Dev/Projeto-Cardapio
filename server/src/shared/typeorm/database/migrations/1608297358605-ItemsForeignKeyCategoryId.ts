/**
 * Migration - Items Foreign Key (Category Id)
 */

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ItemsForeignKeyCategoryId1608297358605
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'items',
            new TableForeignKey({
                name: 'items_category_id',
                columnNames: ['category_id'],
                referencedTableName: 'categories',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items', 'items_category_id');
    }
}
