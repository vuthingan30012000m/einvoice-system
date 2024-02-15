import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxOffice } from './infrastructure/dataaccess/entities/tax-office.entity';
import { TaxOfficeSeeder } from './infrastructure/seeders/tax-office.seeder';
import { Bank } from './infrastructure/dataaccess/entities/bank.entity';
import { BankSeeder } from './infrastructure/seeders/bank.seeder';
import { Address } from './infrastructure/dataaccess/entities/address.entity';
import { AddressSeeder } from './infrastructure/seeders/address.seeder';
import { DatabaseConfig } from './infrastructure/dataaccess/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxOffice, Bank, Address]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DATABASE_HOST'],
      port: Number(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    })
  ],
  controllers: [UserController],
  providers: [UserService, TaxOfficeSeeder, BankSeeder, AddressSeeder],
})
export class UserModule {}
