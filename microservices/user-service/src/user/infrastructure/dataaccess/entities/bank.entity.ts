import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  shortName: string;
}
