import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TaxPayerEntity } from './tax-payer.entity';

@Entity()
export class TaxOfficeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => TaxPayerEntity, (taxPayer) => taxPayer.taxOffice, {
    cascade: true,
  })
  taxPayers: TaxPayerEntity[];
}
