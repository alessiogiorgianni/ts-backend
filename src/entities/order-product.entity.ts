import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Products } from "./products.entity";

@Index("fk_order_products_1_idx", ["orderId"], {})
@Index("fk_order_products_2_idx", ["productId"], {})
@Entity("order_products", { schema: "ts-backend-db" })
export class OrderProduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order_id" })
  orderId: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("int", { name: "quantity", nullable: true, unsigned: true })
  quantity: number | null;

  @ManyToOne(() => Order, (orders) => orders.orderProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => Products, (products) => products.orderProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
