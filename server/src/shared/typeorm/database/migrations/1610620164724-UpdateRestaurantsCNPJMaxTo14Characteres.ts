import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateRestaurantsCNPJMaxTo14Characteres1610620164724
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'restaurants',
            'cnpj',
            new TableColumn({
                name: 'cnpj',
                type: 'varchar',
                length: '14',
                isUnique: true,
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'restaurants',
            'cnpj',
            new TableColumn({
                name: 'cnpj',
                type: 'varchar',
                length: '11',
                isUnique: true,
            }),
        );
    }
}
