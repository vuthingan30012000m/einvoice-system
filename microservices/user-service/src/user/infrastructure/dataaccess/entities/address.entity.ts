import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ward } from './ward.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @ManyToOne(() => Ward, (ward) => ward.addresses)
  ward: Ward;
}
