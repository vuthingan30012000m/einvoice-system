import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import * as faker from 'faker';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Mã sản phẩm',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty({
    description: 'Tên của sản phẩm',
    example: faker.commerce.productName(),
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'Đơn vị của sản phẩm',
    example: 'kg',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  readonly unit?: string;

  @ApiProperty({
    description: 'Giá của sản phẩm',
    example: faker.commerce.price(10, 100),
    required: false,
  })
  @IsNumber()
  readonly price?: number;

  @ApiProperty({
    description: 'Mô tả của sản phẩm',
    example: faker.commerce.productDescription(),
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

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
