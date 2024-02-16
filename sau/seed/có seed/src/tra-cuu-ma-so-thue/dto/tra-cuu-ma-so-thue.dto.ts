import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class TraCuuMaSoThueDto {
  @ApiProperty({
    example: '0107001729',
    description: 'Mã số thuế (10 hoặc 14 ký tự và đúng định dạng)',
    required: true,
  })
  @IsString()
  @Matches(/^(\d{10}|\d{10}-\d{3})$/, {
    message: 'Mã số thuế phải có độ dài 10 hoặc 14 ký tự và đúng định dạng',
  })
  MaSoThue: string;
}
