import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TestSeeder } from './seeders/test.seeder';

@Module({
  controllers: [UserController],
  providers: [UserService,TestSeeder],
})
export class UserModule {}
