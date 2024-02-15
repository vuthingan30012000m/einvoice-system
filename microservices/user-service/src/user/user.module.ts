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

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxOffice,Bank,Address]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root_password',
      database: 'nghia',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TaxOfficeSeeder,BankSeeder,AddressSeeder],
})
export class UserModule {}
