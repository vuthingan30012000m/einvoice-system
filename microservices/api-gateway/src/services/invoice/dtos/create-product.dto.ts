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

export class CreateProductDto {
  @ApiProperty({
    description: 'Tên của sản phẩm',
    example: faker.commerce.productName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Đơn vị của sản phẩm',
    example: 'kg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly unit: string;

  @ApiProperty({
    description: 'Giá của sản phẩm',
    example: faker.commerce.price(10, 100),
    required: true,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Mô tả của sản phẩm',
    example: faker.commerce.productDescription(),
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Thuế suất của sản phẩm',
    example: faker.datatype.number({ min: 0, max: 20 }),
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly taxRate: number;

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
