import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaxPayerEntity {
  @PrimaryGeneratedColumn()
  id: string;

//   @Column({ nullable: false })
//   name: string;
}
