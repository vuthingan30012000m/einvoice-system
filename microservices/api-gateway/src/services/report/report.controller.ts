import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dịch vụ báo cáo')
@Controller('report')
export class ReportController {
  @Get('coming-soon')
  findAll() {
    return 'coming soon';
  }
}
