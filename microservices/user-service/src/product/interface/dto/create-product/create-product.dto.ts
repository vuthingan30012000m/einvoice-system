import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

import * as faker from 'faker';

export class CreateProductDto {
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
  readonly name: string;
}
