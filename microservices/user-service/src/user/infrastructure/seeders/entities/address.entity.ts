import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
  // @OneToMany
  // @ManyToOne
}
@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  // @OneToMany
  // @ManyToOne
}
@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  // @OneToMany
  // @ManyToOne
}
