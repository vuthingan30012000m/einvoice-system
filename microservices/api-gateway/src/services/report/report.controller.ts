import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dịch vụ báo cáo')
@Controller('report')
export class ReportController {
  @Post()
  create(@Body() createReportDto: CreateReportDto) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
