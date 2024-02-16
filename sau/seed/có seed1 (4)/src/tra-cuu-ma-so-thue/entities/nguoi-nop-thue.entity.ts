import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CoQuanThue } from './co-quan-thue.entity';

@Entity()
export class NguoiNopThue {
  @PrimaryGeneratedColumn('uuid')
  MaSoThue: string;

  @Column()
  TenNguoiNopThue: string;

  @ManyToOne(() => CoQuanThue, (coQuanThue) => coQuanThue.listNguoiNopThue, {
    onDelete: 'SET NULL',
  })
  CoQuanThueQuanLy: CoQuanThue;
}
