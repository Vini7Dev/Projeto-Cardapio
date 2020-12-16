import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class MenuItemsForeignKeyItemId1608149291232
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'menu_items',
            new TableForeignKey({
                name: 'menu_items_item_id',
                columnNames: ['item_id'],
                referencedTableName: 'items',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('menu_items', 'menu_items_item_id');
    }
}
