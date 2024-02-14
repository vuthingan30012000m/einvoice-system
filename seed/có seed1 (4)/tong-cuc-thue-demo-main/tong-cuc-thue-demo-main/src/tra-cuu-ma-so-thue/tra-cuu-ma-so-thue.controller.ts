import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TraCuuMaSoThueService } from './tra-cuu-ma-so-thue.service';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateTraCuuMaSoThueDto } from './dto/create-tra-cuu-ma-so-thue.dto';
import { UpdateTraCuuMaSoThueDto } from './dto/update-tra-cuu-ma-so-thue.dto';

@Controller('tra-cuu-ma-so-thue')
@ApiTags('Tra cứu mã số thuế')
export class TraCuuMaSoThueController {
  constructor(private readonly traCuuMaSoThueService: TraCuuMaSoThueService) {}

  // @Post()
  // create(@Body() createTraCuuMaSoThueDto: CreateTraCuuMaSoThueDto) {
  //   return this.traCuuMaSoThueService.create(createTraCuuMaSoThueDto);
  // }

  // @Get()
  // findAll() {
  //   return this.traCuuMaSoThueService.findAll();
  // }

  @Get(':ma_so_thue')
  @ApiParam({ name: 'ma_so_thue', description: 'Mã số thuế' })
  findOne(@Param('ma_so_thue') ma_so_thue: string) {
    return this.traCuuMaSoThueService.findOne(+ma_so_thue);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTraCuuMaSoThueDto: UpdateTraCuuMaSoThueDto) {
  //   return this.traCuuMaSoThueService.update(+id, updateTraCuuMaSoThueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.traCuuMaSoThueService.remove(+id);
  // }
}
