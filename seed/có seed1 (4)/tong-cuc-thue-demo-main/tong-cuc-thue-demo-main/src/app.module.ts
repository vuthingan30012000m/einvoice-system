import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraCuuMaSoThueModule } from './tra-cuu-ma-so-thue/tra-cuu-ma-so-thue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoQuanThueModule } from './co-quan-thue/co-quan-thue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'tong_cuc_thue_demo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TraCuuMaSoThueModule,
    CoQuanThueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
