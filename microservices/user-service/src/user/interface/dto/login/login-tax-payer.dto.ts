import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import * as faker from 'faker';

export class LoginTaxPayerDto {
  @ApiProperty({
    description: 'Email của người nộp thuế',
    example: faker.internet.email(),
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
    message: 'Email không đúng định dạng.',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Mật khẩu của tài khoản',
    example: faker.internet.password(),
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
