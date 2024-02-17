import { TaxPayerStatus } from 'src/user/core/domain/value-objects/tax-payer-status';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaxPayerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  taxOfficeId: string;

  @Column({ nullable: false })
  bankDetailId: string;

  @Column({ nullable: false })
  addressId: string;

  @Column({ nullable: false })
  taxPayerStatus: TaxPayerStatus;
}
