import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BankEntity } from './bank.entity';

@Entity()
export class BankDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  accountBank: string;

  @ManyToOne(() => BankEntity, (bank) => bank.bankDetails, { nullable: false })
  bank: BankEntity;
}
