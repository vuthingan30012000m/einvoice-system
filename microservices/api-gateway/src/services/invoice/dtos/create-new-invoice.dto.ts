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

export class InvoiceItem {
  @ApiProperty({
    description: 'Mã định danh của sản phẩm',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty({
    description: 'Số lượng sản phẩm',
    example: faker.datatype.number({ min: 0, max: 20 }),
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly quantity: number;

  @ApiProperty({
    description: 'Giá của sản phẩm',
    example: faker.commerce.price(10, 100),
    required: true,
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Thuế suất của sản phẩm',
    example: faker.datatype.number({ min: 0, max: 20 }),
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly taxRate: number;
}
export class CreateNewInvoiceDto {
  @ApiProperty({
    description: 'Mã định danh của  người mua',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly buyerId: string;

  @ApiProperty({ type: [InvoiceItem] })
  readonly invoiceItems: Array<{ InvoiceItem }>;

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
