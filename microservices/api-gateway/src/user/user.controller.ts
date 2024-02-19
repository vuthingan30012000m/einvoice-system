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

import { RegisterTaxPayerDto } from './dto/register-tax-payer/register-tax-payer.dto';
import { LoginTaxPayerDto } from './dto/login-tax-payer/login-tax-payer.dto';
import {
  TaxPayer,
  TaxPayerJwtPayload,
} from 'src/common/api/decorators/tax-payer.decorator';

import { Response } from 'express';
import { QRCodeSegment, toFileStream } from 'qrcode';
import { RequestResetPasswordDto } from './dto/request-reset-password/request-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password/change-password.dto';
import { UpdateTaxPayerDto } from './dto/update-tax-payer/update-tax-payer.dto';
import { DeleteTaxPayerDto } from './dto/delete-tax-payer/delete-tax-payer.dto';

@Controller('user')
@ApiTags('Dịch vụ quản lý người dùng')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('register-tax-payer')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  register(@Body() registerTaxPayerDto: RegisterTaxPayerDto) {
    return this.natsClient.send({ cmd: 'register' }, registerTaxPayerDto);
  }

  @Get('verify-email/:tokenEmail')
  @ApiOperation({ summary: 'Xác thực email' })
  verifyEmail(@Param('tokenEmail') tokenEmail: string) {
    return this.natsClient.send({ cmd: 'verify-email' }, tokenEmail);
  }

  @Post('login-tax-payer')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  login(@Body() LoginTaxPayerDto: LoginTaxPayerDto) {
    return this.natsClient.send({ cmd: 'login' }, LoginTaxPayerDto);
  }

  @Get('get-tax-payer-current')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xem thông tin người nộp thuế hiện tại' })
  getTaxPayerCurrent(@TaxPayer() TaxPayer: TaxPayerJwtPayload) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    return this.natsClient.send(
      { cmd: 'get-tax-payer-current' },
      { taxCode: TaxPayer.taxCode },
    );
  }

  @Post('request-reset-password')
  @ApiOperation({ summary: 'Yêu cầu quên mật khẩu' })
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.natsClient.send(
      { cmd: 'request-reset-password' },
      requestResetPasswordDto,
    );
  }

  @Get('verify-reset-password/:tokenPassword')
  @ApiOperation({ summary: 'Xác thực quên mật khẩu' })
  verifyResetPassword(@Param('tokenPassword') tokenPassword: string) {
    return this.natsClient.send(
      { cmd: 'verify-reset-password' },
      tokenPassword,
    );
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

  @Post('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đổi mật khẩu' })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    return this.natsClient.send(
      { cmd: 'change-password' },
      {
        taxCode: TaxPayer.taxCode,
        password: changePasswordDto.password,
        passwordConfirm: changePasswordDto.passwordConfirm,
        usbToken: changePasswordDto.usbToken,
      },
    );
  }

  @Post('update-tax-payer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin người nộp thuế' })
  updateTaxPayer(
    @Body() UpdateTaxPayerDto: UpdateTaxPayerDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    return this.natsClient.send(
      { cmd: 'update-tax-payer' },
      {
        taxCode: TaxPayer.taxCode,
        name: UpdateTaxPayerDto.name,
        email: UpdateTaxPayerDto.email,
        phoneNumber: UpdateTaxPayerDto.phoneNumber,
        usbToken: UpdateTaxPayerDto.usbToken,
      },
    );
  }

  @Post('delete-tax-payer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa tài khoản người nộp thuế' })
  deleteTaxPayer(
    @Body() deleteTaxPayerDto: DeleteTaxPayerDto,
    @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  ) {
    if (!TaxPayer) {
      return 'Hãy đăng nhập để thực hiện chức năng này.';
    }

    return this.natsClient.send(
      { cmd: 'delete-tax-payer' },
      {
        taxCode: TaxPayer.taxCode,
        usbToken: deleteTaxPayerDto.usbToken,
      },
    );
  }
}
