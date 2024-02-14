
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TestSeeder implements OnModuleInit {
  private logger = new Logger(TestSeeder.name);
  
  onModuleInit() {
    this.logger.log('Seeder successfully initialized');
  }
}
