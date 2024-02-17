import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaxOfficeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;
}
