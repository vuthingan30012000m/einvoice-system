import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('demo')
@ApiTags('Demo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('uuid')
  @ApiOperation({ summary: 'Lấy giá trị uuid' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tạo thành công' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Không được chấp nhận' })
  getRandomValue() {
    const uuid = this.appService.getRandomValue();

    if (uuid) {
      const successResponse = {
        uuid,
        // statusCode: HttpStatus.CREATED,
        message: 'Tạo thành công',
      };
      throw new HttpException(successResponse, HttpStatus.CREATED);
    } else {
      const errorResponse = {
        uuid,
        // statusCode: HttpStatus.OK,
        message: 'Không được chấp nhận',
      };
      throw new HttpException(errorResponse, HttpStatus.OK);
    }
  }
}
