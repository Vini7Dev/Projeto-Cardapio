/**
 * Restaurant Entity
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Menu from '../../../menus/typeorm/entities/Menu';

@Entity('restaurants')
class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 25 })
    trade: string;

    @Column('varchar', { length: 11 })
    cnpj: string;

    @Column('varchar', { length: 11 })
    telephone: string;

    @Column()
    logo: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    menu_id: string;

    @OneToOne(() => Menu)
    @JoinColumn({ name: 'menu_id' })
    menu: Menu;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'logo_url' })
    getLogoURL(): string {
        return `${process.env.APP_SERVER_URL}/files/${this.logo}`;
    }
}

export default Restaurant;
