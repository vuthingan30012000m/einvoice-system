import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TraCuuMaSoThueService } from './tra-cuu-ma-so-thue.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TraCuuMaSoThueDto } from './dto/tra-cuu-ma-so-thue.dto';

@Controller('tra-cuu-ma-so-thue')
@ApiTags('Tra cứu mã số thuế')
export class TraCuuMaSoThueController {
  constructor(private readonly traCuuMaSoThueService: TraCuuMaSoThueService) {}

  @Post()
  @ApiBody({ type: TraCuuMaSoThueDto })
  @ApiOperation({
    summary: 'Tra cứu thông tin của người nộp thuế theo mã số thuế',
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin của người nộp thuế theo mã số thuế',
  })
    // @ApiResponse({ thêm các trường hợp khác...
  async traCuuMaSoThue(@Body() traCuuMaSoThueDto: TraCuuMaSoThueDto) {
    const result =
      await this.traCuuMaSoThueService.traCuuMaSoThue(traCuuMaSoThueDto);
    return result;
  }
}
