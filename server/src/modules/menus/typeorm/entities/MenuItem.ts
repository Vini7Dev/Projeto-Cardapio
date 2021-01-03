/**
 * MenuItem Entity
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Item from '../../../items/typeorm/entities/Item';

@Entity('menu_items')
class MenuItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    menu_id: string;

    @Column('uuid')
    item_id: string;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default MenuItem;
