import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BankDetailEntity } from './bank-detail.entity';

@Entity()
export class BankEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ unique: true, nullable: false })
  shortName: string;

  @OneToMany(() => BankDetailEntity, (bankDetail) => bankDetail.bank, {
    cascade: true,
  })
  bankDetails: BankDetailEntity[];
}
