import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('demo')
@ApiTags('Demo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('uuid')
  @ApiOperation({ summary: 'Lấy giá trị uuid' })
  // @MessagePattern({ cmd: 'uuid' })
  getRandomValue() {
    return this.appService.getRandomValue();
  }
  // @MessagePattern({ cmd: 'tct' })
  // tct() {
    // return this.appService.getRandomValue();
  // }
}
