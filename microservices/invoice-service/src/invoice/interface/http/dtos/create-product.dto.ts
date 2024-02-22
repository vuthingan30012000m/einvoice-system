import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
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
    description: 'Mã số thuế của người nộp thuế',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly taxPayerId: string;
  readonly usbToken: string;
}
