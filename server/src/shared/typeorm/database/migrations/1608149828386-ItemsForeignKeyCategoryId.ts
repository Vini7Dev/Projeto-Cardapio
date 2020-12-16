import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ItemsForeignKeyCategoryId1608149828386
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'items',
            new TableForeignKey({
                name: 'items_category_id',
                columnNames: ['category_id'],
                referencedTableName: 'categories',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items', 'items_category_id');
    }
}
