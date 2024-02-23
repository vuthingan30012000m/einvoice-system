import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('demo')
@ApiTags('Demo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('uuid')
  @ApiOperation({ summary: 'Lấy giá trị uuid' })
  getRandomValue() {
    return this.appService.getRandomValue();
  }
}
