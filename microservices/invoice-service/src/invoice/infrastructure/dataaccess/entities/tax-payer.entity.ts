import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { TaxOfficeEntity } from './tax-office.entity';
import { AddressEntity } from './address.entity';
import { BankDetailEntity } from './bank-detail.entity';
import { TaxPayerStatus } from '../../../core/domain/value-objects/tax-payer-status';
import { ProductEntity } from './product.entity';
import { InvoiceEntity } from './invoice.entity';

@Entity()
export class TaxPayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    unique: true,
    nullable: false,
  })
  phoneNumber: string;

  @Column({ nullable: false })
  taxPayerStatus: TaxPayerStatus;

  @ManyToOne(() => TaxOfficeEntity, (taxOffice) => taxOffice.taxPayers, {
    nullable: false,
  })
  taxOffice: TaxOfficeEntity;

  @OneToOne(() => BankDetailEntity)
  @JoinColumn()
  bankDetail: BankDetailEntity;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;

  @Column({ default: false })
  isUsbToken: boolean;

  @Column({ nullable: true })
  usbToken: string;

  @OneToMany(() => ProductEntity, (taxPayer) => taxPayer.taxPayer, {
    cascade: true,
  })
  products: ProductEntity[];

  @OneToMany(() => InvoiceEntity, (taxPayer) => taxPayer.seller, {
    cascade: true,
  })
  sellerInvoices: InvoiceEntity[];

  @OneToMany(() => InvoiceEntity, (taxPayer) => taxPayer.buyer, {
    cascade: true,
  })
  buyerInvoices: InvoiceEntity[];
}
