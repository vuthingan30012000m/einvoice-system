import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { District } from './district.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Address, (address) => address.ward)
  addresses: Address[];

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
