import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUserIdColumnToRestaurantId1609328637945
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'forgot_password_tokens',
            'user_id',
            new TableColumn({
                name: 'restaurant_id',
                type: 'uuid',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'forgot_password_tokens',
            'restaurant_id',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );
    }
}
