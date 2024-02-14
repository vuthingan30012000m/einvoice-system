





import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import * as faker from 'faker';

export class CreateInvoiceDto {
    @ApiProperty({
      description: 'Tên của sản phẩm',
      example: faker.commerce.productName(),
      required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9\s]+$/, {
      message: 'Tên chỉ có thể chứa chữ cái, số và khoảng trắng.',
    })
  readonly productName: string; 
}
