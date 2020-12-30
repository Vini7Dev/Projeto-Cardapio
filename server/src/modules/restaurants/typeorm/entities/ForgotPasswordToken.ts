/**
 * Forgot Password Token Entity
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('forgot_password_tokens')
class ForgotPasswordToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column('uuid')
    restaurant_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ForgotPasswordToken;
