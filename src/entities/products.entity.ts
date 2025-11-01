import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartsProducts } from './carts-products.entity';
import { OrderProduct } from './order-product.entity';
import { Category } from './category.entity';

@Index('id_UNIQUE', ['id'], { unique: true })
@Index('name_UNIQUE', ['name'], { unique: true })
@Index('fk_products_1_idx', ['categoryId'], {})
@Entity('products', { schema: 'ts-backend-db' })
export class Products {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'category_id', nullable: true })
  categoryId: number | null;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('varchar', { name: 'image_link', nullable: true, length: 1024 })
  imageLink: string | null;

  @Column('tinyint', {
    name: 'is_available',
    nullable: true,
    default: () => "'1'",
  })
  isAvailable: number | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(() => CartsProducts, (cartsProducts) => cartsProducts.product)
  cartsProducts: CartsProducts[];

  @OneToMany(() => OrderProduct, (orderProducts) => orderProducts.product)
  orderProducts: OrderProduct[];

  @ManyToOne(() => Category, (categories) => categories.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
