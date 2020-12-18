/**
 * MenuItem Entity
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('menu_items')
class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    menu_id: number;

    @Column('uuid')
    item_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default MenuItem;
