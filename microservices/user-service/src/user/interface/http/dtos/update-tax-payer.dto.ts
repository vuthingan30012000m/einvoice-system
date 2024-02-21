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

export class UpdateTaxPayerDto {
  @ApiProperty({
    description: 'Mã số thuế của người nộp thuế',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly taxCode: string;

  @ApiProperty({
    description: 'Tên của người nộp thuế',
    example: faker.name.findName(),
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'Email của người nộp thuế',
    example: faker.internet.email(),
    required: false,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
    message: 'Email không đúng định dạng.',
  })
  readonly email?: string;

  @ApiProperty({
    description: 'Số điện thoại của người nộp thuế',
    example: faker.phone.phoneNumber(),
    required: false,
  })
  @IsNotEmpty()
  @Matches(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    { message: 'Số điện thoại không đúng định dạng.' },
  )
  readonly phoneNumber?: string;

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
