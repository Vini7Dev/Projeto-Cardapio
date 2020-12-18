/**
 * Menu Entity
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menus')
class Menu {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int4')
    code: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Menu;
