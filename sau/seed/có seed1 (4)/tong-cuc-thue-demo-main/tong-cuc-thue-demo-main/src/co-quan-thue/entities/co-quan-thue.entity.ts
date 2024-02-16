import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CoQuanThue {
  @PrimaryGeneratedColumn()
  MaCoQuanThueQuanLy: number;

  @Column()
  TenCoQuanThueQuanLy: string;
}
