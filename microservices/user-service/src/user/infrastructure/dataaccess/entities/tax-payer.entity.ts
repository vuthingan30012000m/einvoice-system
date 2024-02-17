import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TaxOfficeEntity } from './tax-office.entity';
import { AddressEntity } from './address.entity';
import { BankDetailEntity } from './bank-detail.entity';

@Entity()
export class TaxPayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
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
}
