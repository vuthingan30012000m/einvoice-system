import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCoQuanThueDto {
  @IsNotEmpty()
  @IsNumber()
  MaCoQuanThueQuanLy: number;

  @IsNotEmpty()
  @IsString()
  TenCoQuanThueQuanLy: string;
}
