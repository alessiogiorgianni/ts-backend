import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Index("id_UNIQUE", ["id"], { unique: true })
@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("categories", { schema: "ts-backend-db" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 1024 })
  description: string | null;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
