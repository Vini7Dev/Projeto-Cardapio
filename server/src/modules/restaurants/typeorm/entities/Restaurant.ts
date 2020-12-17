/**
 * Restaurant Entity
 */

 import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
    password: string;

    @Column('int4')
    menu_code: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Restaurant;
