import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NguoiNopThue } from './nguoi-nop-thue.entity';

@Entity()
export class CoQuanThue {
  @PrimaryGeneratedColumn()
  MaCoQuanThue: number;

  @Column()
  TenCoQuanThue: string;

  @OneToMany(
    () => NguoiNopThue,
    (nguoiNopThue) => nguoiNopThue.CoQuanThueQuanLy,
  )
  listNguoiNopThue: NguoiNopThue[];
}
