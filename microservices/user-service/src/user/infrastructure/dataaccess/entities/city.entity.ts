import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => DistrictEntity, (district) => district.city, {
    cascade: true,
  })
  districts: DistrictEntity[];
}
