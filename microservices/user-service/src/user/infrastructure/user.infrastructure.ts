import { DatabaseConfig } from './dataaccess/config/database.config';
import { WardEntity } from './dataaccess/entities/ward.entity';
import { TaxOfficeEntity } from './dataaccess/entities/tax-office.entity';
import { BankEntity } from './dataaccess/entities/bank.entity';
import { CityEntity } from './dataaccess/entities/city.entity';
import { DistrictEntity } from './dataaccess/entities/district.entity';
import { AddressEntity } from './dataaccess/entities/address.entity';
import { TaxOfficeSeeder } from './dataaccess/seeders/tax-office.seeder';
import { BankSeeder } from './dataaccess/seeders/bank.seeder';
import { AddressSeeder } from './dataaccess/seeders/address.seeder';
import { BankDetailEntity } from './dataaccess/entities/bank-detail.entity';
import { TaxPayerRepository } from '../core/application/ports/dataaccess/repositories/tax-payer.repository';
import { TaxPayerOrmRepository } from './dataaccess/repositories/tax-payer.orm-repository';
import { TaxPayerEntity } from './dataaccess/entities/tax-payer.entity';
import { TaxOfficeRepository } from '../core/application/ports/dataaccess/repositories/tax-office.repository';
import { TaxOfficeOrmRepository } from './dataaccess/repositories/tax-office.orm-repository';
import { BankRepository } from '../core/application/ports/dataaccess/repositories/bank.repository';
import { BankOrmRepository } from './dataaccess/repositories/bank.orm-repository';
import { WardRepository } from '../core/application/ports/dataaccess/repositories/ward.repository';
import { WardOrmRepository } from './dataaccess/repositories/ward.orm-repository';
import { BankDetailRepository } from '../core/application/ports/dataaccess/repositories/bank-detail.repository';
import { BankDetailOrmRepository } from './dataaccess/repositories/bank-detail.orm-repository';
import { AddressRepository } from '../core/application/ports/dataaccess/repositories/address.repository';
import { AddressOrmRepository } from './dataaccess/repositories/address.orm-repository';
import { MailerConfig } from './mailer/config/mailer.config';

export const UserInfrastructure = {
  providers: [
    {
      provide: TaxPayerRepository,
      useClass: TaxPayerOrmRepository,
    },
    {
      provide: TaxOfficeRepository,
      useClass: TaxOfficeOrmRepository,
    },
    {
      provide: BankRepository,
      useClass: BankOrmRepository,
    },
    {
      provide: WardRepository,
      useClass: WardOrmRepository,
    },
    {
      provide: BankDetailRepository,
      useClass: BankDetailOrmRepository,
    },
    {
      provide: AddressRepository,
      useClass: AddressOrmRepository,
    },
  ],
  configs: [
    DatabaseConfig.init()
    ,
    MailerConfig.init()

  
],
  repositories: [
    TaxOfficeEntity,
    BankEntity,
    CityEntity,
    DistrictEntity,
    WardEntity,
    AddressEntity,
    BankDetailEntity,
    TaxPayerEntity,
  ],
  seeders: [TaxOfficeSeeder, BankSeeder, AddressSeeder],
};
