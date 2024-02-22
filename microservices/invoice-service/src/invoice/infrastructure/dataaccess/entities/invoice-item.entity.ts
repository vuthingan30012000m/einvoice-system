import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { InvoiceEntity } from './invoice.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => ProductEntity)
  // @JoinColumn()
  // product: ProductEntity;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  taxRate: number;

  @Column({ nullable: false })
  subTotal: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.invoiceItems, {
    nullable: false,
  })
  invoice: InvoiceEntity;
}
