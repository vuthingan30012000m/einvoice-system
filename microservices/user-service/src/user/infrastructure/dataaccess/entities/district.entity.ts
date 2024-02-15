import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Ward } from './ward.entity';
import { City } from './city.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @ManyToOne(() => City, (city) => city.districts)
  city: City;
}
