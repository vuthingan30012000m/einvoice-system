import { PartialType } from '@nestjs/swagger';
import { CreateTraCuuMaSoThueDto } from './create-tra-cuu-ma-so-thue.dto';

export class UpdateTraCuuMaSoThueDto extends PartialType(CreateTraCuuMaSoThueDto) {}
