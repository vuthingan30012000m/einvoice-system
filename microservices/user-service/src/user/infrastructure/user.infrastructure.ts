// import { BankSeeder } from './dataaccess/seeders/bank.seeder';
// import { Address } from './dataaccess/entities/address.entity';
// import { Bank } from './dataaccess/entities/bank.entity';
// import { City } from './dataaccess/entities/city.entity';
// import { District } from './dataaccess/entities/district.entity';
// import { TaxOffice } from './dataaccess/entities/tax-office.entity';
// import { Ward } from './dataaccess/entities/ward.entity';
// import { TaxOfficeSeeder } from './dataaccess/seeders/tax-office.seeder';
// import { AddressSeeder } from './dataaccess/seeders/address.seeder';
// import { DatabaseConfig } from './dataaccess/config/database.config';

export const UserInfrastructure = {
  providers: [],
  configs: [
    // DatabaseConfig.init()
  ],
  repositories: [
    // TaxOffice, Bank, City, District, Ward, Address
  ],
  seeders: [
    // TaxOfficeSeeder, BankSeeder, AddressSeeder
  ],
};
