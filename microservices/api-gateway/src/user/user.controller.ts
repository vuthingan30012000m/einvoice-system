import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
} from '@nestjs/common';

import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ClientProxy } from '@nestjs/microservices';

import { RegisterTaxPayerDto } from './dto/register/register-tax-payer.dto';
import { LoginTaxPayerDto } from './dto/login/login-tax-payer.dto';
import {
  TaxPayer,
  TaxPayerJwtPayload,
} from 'src/common/api/decorators/tax-payer.decorator';

import { Response } from 'express';
import { QRCodeSegment, toFileStream } from 'qrcode';

@Controller('user')
@ApiTags('Dịch vụ quản lý người dùng')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  register(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'register' }, registerTaxPayerDto);
  }

  @Get('verify-email/:tokenEmail')
  @ApiOperation({ summary: 'Xác thực email' })
  verifyEmail(@Param('tokenEmail') tokenEmail: string) {
    return this.natsClient.send({ cmd: 'verify-email' }, tokenEmail);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  login(@Body() LoginTaxPayerDto: LoginTaxPayerDto) {
    return this.natsClient.send({ cmd: 'login' }, LoginTaxPayerDto);
  }

  @Get('get-taxpayer-current')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xem thông tin người nộp thuế hiện tại' })
  getTaxPayerCurrent(@TaxPayer() TaxPayer: TaxPayerJwtPayload) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    return this.natsClient.send({ cmd: 'get-taxpayer-current' },  { taxCode: TaxPayer.taxCode });
  }

  @Get('register-usb-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng ký chữ ký số USB Token' })
  registerUsbTokenHandler(
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
    @Res() Response: Response,
  ) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    Response.type('png');

    const result = this.registerUsbToken(TaxPayer);
    result.subscribe((data: string | QRCodeSegment[]) => {
      toFileStream(Response, data);
    });
  }

  registerUsbToken(TaxPayer: TaxPayerJwtPayload) {
    return this.natsClient.send(
      { cmd: 'register-usb-token' },
      { taxCode: TaxPayer.taxCode },
    );
  }

  // <!-- - resetPassword() -->
  // <!-- Không cần đăng nhập -->
  // Quên mật khẩu
  // UsbToken
  // Pas
  // Comffim
  
  // <!-- + updateTaxPayer() -->
  
  // Cập nhật thông tin người nộp thuế
  
  // Id .... ìnor
  
  // Giống update CRUD
  
  // <!-- + deleteTaxPayer() -->
  
  // Taxpayer delete erorr
  
  // Xóa tài khoản người nộp thuế
  
  // Id
  
  // Status =xóa
  
  // return "Controller"
}
