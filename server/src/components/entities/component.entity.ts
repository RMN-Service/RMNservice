import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('components')
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column('jsonb')
  specifications: {
    socket?: string;
    chipset?: string;
    ramType?: string;
    formFactor?: string;
    tdp?: number;
    wattage?: number;
    slots?: number;
    [key: string]: any;
  };

  @CreateDateColumn()
  createdAt: Date;
}
