import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Products } from './products.entity';

@Index('fk_carts_products_1_idx', ['cartId'], {})
@Index('fk_carts_products_2_idx', ['productId'], {})
@Entity('carts_products', { schema: 'ts-backend-db' })
export class CartsProducts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'cart_id' })
  cartId: number;

  @Column('int', { name: 'product_id' })
  productId: number;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('int', { name: 'created_at', nullable: true })
  createdAt: number | null;

  @Column('int', { name: 'updated_at', nullable: true })
  updatedAt: number | null;

  @ManyToOne(() => Cart, (carts) => carts.cartsProducts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'cart_id', referencedColumnName: 'id' }])
  cart: Cart;

  @ManyToOne(() => Products, (products) => products.cartsProducts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;
}
