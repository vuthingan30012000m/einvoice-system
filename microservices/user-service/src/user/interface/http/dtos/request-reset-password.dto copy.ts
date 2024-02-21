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

export class RequestResetPasswordDto {
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
}
