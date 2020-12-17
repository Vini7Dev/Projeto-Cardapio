/**
 * Category Entity
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 35 })
    category_name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Category;
