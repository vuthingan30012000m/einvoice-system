import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { BankDetailEntity } from './bank-detail.entity';
import { InvoiceItemEntity } from './invoice-item.entity';
import { TaxPayerEntity } from './tax-payer.entity';

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TaxPayerEntity)
  @JoinColumn()
  seller: TaxPayerEntity;

  @OneToOne(() => TaxPayerEntity)
  @JoinColumn()
  buyer: TaxPayerEntity;

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.invoice, {
    cascade: true,
  })
  invoiceItems: InvoiceItemEntity[];

  @Column({
    nullable: false,
  })
  totalBeforeTax: number;

  @Column({
    nullable: false,
  })
  totalAfterTax: number;
}
