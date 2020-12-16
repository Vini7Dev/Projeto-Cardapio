import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class MenuItemsForeignKeyMenucode1608148538756
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'menu_items',
            new TableForeignKey({
                name: 'menu_items_menu_code',
                columnNames: ['menu_code'],
                referencedTableName: 'restaurants',
                referencedColumnNames: ['menu_code'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('menu_items', 'menu_items_menu_code');
    }
}
