import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TaxOffice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
