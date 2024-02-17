import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => DistrictEntity, (district) => district.city, {
    cascade: true,
  })
  districts: DistrictEntity[];
}
