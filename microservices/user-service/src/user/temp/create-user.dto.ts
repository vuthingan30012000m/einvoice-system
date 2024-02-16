import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import * as faker from 'faker';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên của người dùng',
    example: faker.name.findName(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Email của người dùng',
    example: faker.internet.email(),
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
