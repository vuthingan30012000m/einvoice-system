import { DatabaseConfig } from './dataaccess/config/database.config';
import { WardEntity } from './dataaccess/entities/ward.entity';
import { OrmRepository } from './dataaccess/repositories/orm.repository';
import { TaxOfficeEntity } from './dataaccess/entities/tax-office.entity';
import { BankEntity } from './dataaccess/entities/bank.entity';
import { CityEntity } from './dataaccess/entities/city.entity';
import { DistrictEntity } from './dataaccess/entities/district.entity';
import { AddressEntity } from './dataaccess/entities/address.entity';
import { TaxOfficeEntitySeeder } from './dataaccess/seeders/tax-office.seeder';
import { BankEntitySeeder } from './dataaccess/seeders/bank.seeder';
import { AddressSeeder } from './dataaccess/seeders/address.seeder';
import { BankDetailEntity } from './dataaccess/entities/bank-detail.entity';

export const UserInfrastructure = {
  providers: [
    {
      provide: RegisterTaxPayerPort,
      useClass: OrmRepository,
    },
  ],
  configs: [DatabaseConfig.init()],
  repositories: [
    TaxOfficeEntity,
    BankEntity,
    CityEntity,
    DistrictEntity,
    WardEntity,
    AddressEntity,
    BankDetailEntity,
  ],
  seeders: [TaxOfficeEntitySeeder, BankEntitySeeder, AddressSeeder],
};
