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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  shortName: string;

  @OneToMany(() => BankDetailEntity, (bankDetail) => bankDetail.bank, {
    cascade: true,
  })
  bankDetails: BankDetailEntity[];
}
