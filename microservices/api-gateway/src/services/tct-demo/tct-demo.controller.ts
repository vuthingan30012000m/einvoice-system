import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dịch vụ báo cáo')
@Controller('tct-demo')
export class TctDemoController {
  constructor(@Inject('API_GATEWAY') private apiGateway: ClientProxy) {}

  @Get('uuid')
  @ApiOperation({ summary: 'Lấy giá trị uuid' })
  getRandomValue() {
    return this.apiGateway.send({ cmd: 'uuid' }, {});
  }
}
