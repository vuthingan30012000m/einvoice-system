import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import * as faker from 'faker';

export class LoginTaxPayerDto {
  @ApiProperty({
    description: 'Mã số thuế của người nộp thuế',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly taxCode: string;

  @ApiProperty({
    description: 'Mật khẩu của tài khoản',
    example: faker.internet.password(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Chữ ký số USB Token',
    example: faker.internet.password(),
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  readonly usbToken?: string;
}
