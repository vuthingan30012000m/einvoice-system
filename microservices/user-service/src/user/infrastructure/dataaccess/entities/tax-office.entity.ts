import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaxOfficeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
