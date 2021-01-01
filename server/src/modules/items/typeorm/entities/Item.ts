/**
 * Item Entity
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
import { Expose } from 'class-transformer';

import Category from './Category';

@Entity('items')
class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    restaurant_id: string;

    @Column()
    image: string;

    @Column('varchar', { length: 35 })
    title: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2 })
    discount_price: number;

    @Column('int2')
    category_id: number;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column('boolean')
    enabled: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'image_url' })
    getImageURL(): string | null {
        return `${process.env.APP_SERVER_URL}/files/${this.image}`;
    }
}

export default Item;
