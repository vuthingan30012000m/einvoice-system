import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import * as faker from 'faker';

export class ResponseCreateProductDto {
  @ApiProperty({
    description: 'Định danh của sản phẩm',
    example: faker.datatype.uuid(),
  })
  productId() {
    this._id;
  }
  @Expose({ name: 'productId' })
  _id: string;

  @ApiProperty({
    description: 'Tên của sản phẩm',
    example: faker.commerce.productName(),
  })
  @Transform(({ value }) => value.value)
  name: { value: string };

  @ApiProperty({
    description: 'Ngày tạo sản phẩm',
    example: faker.date.past(),
  })
  createdAt: Date;

  constructor(partial: Partial<ResponseCreateProductDto>) {
    Object.assign(this, partial);
  }
}
