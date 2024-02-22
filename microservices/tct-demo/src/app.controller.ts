import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @MessagePattern({ cmd: 'uuid' })
  getRandomValue() {
   return this.appService.getRandomValue();
  }
}
