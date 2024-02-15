import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];
}
