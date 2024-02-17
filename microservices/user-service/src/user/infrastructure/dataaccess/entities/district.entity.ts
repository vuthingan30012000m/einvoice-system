import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WardEntity } from './ward.entity';
import { CityEntity } from './city.entity';

@Entity()
export class DistrictEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => WardEntity, (ward) => ward.district, { cascade: true })
  wards: WardEntity[];

  @ManyToOne(() => CityEntity, (city) => city.districts, { nullable: false })
  city: CityEntity;
}
