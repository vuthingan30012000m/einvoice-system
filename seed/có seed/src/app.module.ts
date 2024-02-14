import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TraCuuMaSoThueModule } from './tra-cuu-ma-so-thue/tra-cuu-ma-so-thue.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || "root",
      password: process.env.DATABASE_PASSWORD || "",
      database: process.env.DATABASE_NAME || "nghia",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
    }),
    TraCuuMaSoThueModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
