import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxOffice } from './infrastructure/seeders/entities/tax-office.entity';
import { TaxOfficeSeeder } from './infrastructure/seeders/tax-office.seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxOffice]),
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
  providers: [UserService, TaxOfficeSeeder],
})
export class UserModule {}
