import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProductSeeder } from './infrastructure/seeders/product.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infrastructure/seeders/entities/product.entity';

@Module({imports: [TypeOrmModule.forFeature([Product]),
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
  }),],
  controllers: [UserController],
  providers: [UserService,ProductSeeder],
})
export class UserModule {}
