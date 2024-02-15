import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxOffice } from './infrastructure/seeders/entities/tax-office.entity';
import { TaxOfficeSeeder } from './infrastructure/seeders/tax-office.seeder';
import { Bank } from './infrastructure/seeders/entities/bank.entity';
import { BankSeeder } from './infrastructure/seeders/bank.seeder';
import { Address } from './infrastructure/seeders/entities/address.entity';
import { AddressSeeder } from './infrastructure/seeders/address.seeder';
import { DatabaseConfig } from './infrastructure/dataaccess/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxOffice, Bank, Address]),
    DatabaseConfig.init(),
  ],
  controllers: [UserController],
  providers: [UserService, TaxOfficeSeeder, BankSeeder, AddressSeeder],
})
export class UserModule {}
