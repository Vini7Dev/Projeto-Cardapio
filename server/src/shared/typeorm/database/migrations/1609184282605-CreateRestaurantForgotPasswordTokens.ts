import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRestaurantForgotPasswordTokens1609184282605
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'forgot_password_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                        isPrimary: true,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
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
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('forgot_password_tokens');
    }
}
