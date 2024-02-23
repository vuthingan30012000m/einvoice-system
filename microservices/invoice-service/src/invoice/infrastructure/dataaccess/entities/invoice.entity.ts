import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { BankDetailEntity } from './bank-detail.entity';
import { InvoiceItemEntity } from './invoice-item.entity';
import { TaxPayerEntity } from './tax-payer.entity';

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TaxPayerEntity, (taxPayer) => taxPayer.sellerInvoices, {
    nullable: false,
  })
  seller: TaxPayerEntity;

  @ManyToOne(() => TaxPayerEntity, (taxPayer) => taxPayer.buyerInvoices, {
    nullable: false,
  })
  buyer: TaxPayerEntity;

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.invoice, {
    cascade: true,
  })
  invoiceItems: InvoiceItemEntity[];

  @Column({ nullable: false })
  totalBeforeTax: number;

  @Column({ nullable: false })
  totalAfterTax: number;

  @CreateDateColumn()
  createAt: Date;
}
