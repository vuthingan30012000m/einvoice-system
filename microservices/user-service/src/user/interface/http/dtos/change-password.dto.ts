import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mã số thuế của người nộp thuế',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly taxCode: string;

  @ApiProperty({
    description: 'Mật khẩu mới',
    example: faker.internet.password(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Mật khẩu xác nhận',
    example: faker.internet.password(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly passwordConfirm: string;

  @ApiProperty({
    description: 'Chữ ký số USB Token',
    example: faker.datatype
      .number({ min: 1, max: 999999 })
      .toString()
      .padStart(6, '0'),
    required: true,
  })
  @IsNumberString()
  readonly usbToken: string;
}
