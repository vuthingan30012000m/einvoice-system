import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaxPayerEntity } from './tax-payer.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  unit: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  taxRate: number;

  @ManyToOne(() => TaxPayerEntity, (TaxPayer) => TaxPayer.products, {
    nullable: false,
  })
  TaxPayer: TaxPayerEntity;
}
