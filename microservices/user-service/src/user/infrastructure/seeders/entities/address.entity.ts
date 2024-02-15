import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';


@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  note: string;
  // @OneToMany
  // @ManyToOne
}
@Entity()
export class Ward {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
}
@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
}
@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
}
