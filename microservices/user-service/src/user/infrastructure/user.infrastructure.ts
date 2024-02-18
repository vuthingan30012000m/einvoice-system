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
import { TaxPayerRepositoryPort } from '../core/application/ports/dataaccess/repositories/tax-payer.repository.port';
import { TaxPayerOrmRepository } from './dataaccess/repositories/tax-payer.orm-repository';
import { TaxPayerEntity } from './dataaccess/entities/tax-payer.entity';
import { TaxOfficeRepositoryPort } from '../core/application/ports/dataaccess/repositories/tax-office.repository.port';
import { TaxOfficeOrmRepository } from './dataaccess/repositories/tax-office.orm-repository';
import { BankRepositoryPort } from '../core/application/ports/dataaccess/repositories/bank.repository.port';
import { BankOrmRepository } from './dataaccess/repositories/bank.orm-repository';
import { WardRepositoryPort } from '../core/application/ports/dataaccess/repositories/ward.repository.port';
import { WardOrmRepository } from './dataaccess/repositories/ward.orm-repository';
import { BankDetailRepositoryPort } from '../core/application/ports/dataaccess/repositories/bank-detail.repository.port';
import { BankDetailOrmRepository } from './dataaccess/repositories/bank-detail.orm-repository';
import { AddressRepository } from '../core/application/ports/dataaccess/repositories/address.repository';
import { AddressOrmRepository } from './dataaccess/repositories/address.orm-repository';
import { MailerConfig } from './mailer/config/mailer.config';
import * as Joi from '@hapi/joi';
import { MailerAdapter } from './mailer/adapters/mailer.adapter';
import { MailerPort } from '../core/application/ports/mailer/mailer.port';

export const UserInfrastructure = {
  validations: Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.string().required(),
  }),
  configs: [DatabaseConfig.init(), MailerConfig.init()],

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
  providers: [
    {
      provide: TaxPayerRepositoryPort,
      useClass: TaxPayerOrmRepository,
    },
    {
      provide: TaxOfficeRepositoryPort,
      useClass: TaxOfficeOrmRepository,
    },
    {
      provide: BankRepositoryPort,
      useClass: BankOrmRepository,
    },
    {
      provide: WardRepositoryPort,
      useClass: WardOrmRepository,
    },
    {
      provide: BankDetailRepositoryPort,
      useClass: BankDetailOrmRepository,
    },
    {
      provide: AddressRepository,
      useClass: AddressOrmRepository,
    },
    {
      provide: MailerPort,
      useClass: MailerAdapter,
    },
  ],
};
