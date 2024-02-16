import { Injectable } from '@nestjs/common';
import { CreateTraCuuMaSoThueDto } from './dto/create-tra-cuu-ma-so-thue.dto';
import { UpdateTraCuuMaSoThueDto } from './dto/update-tra-cuu-ma-so-thue.dto';

@Injectable()
export class TraCuuMaSoThueService {
  // create(createTraCuuMaSoThueDto: CreateTraCuuMaSoThueDto) {
  //   return 'This action adds a new traCuuMaSoThue';
  // }

  // findAll() {
  //   return `This action returns all traCuuMaSoThue`;
  // }

  findOne(ma_so_thue: number) {
    return `This action returns a #${ma_so_thue} traCuuMaSoThue`;
  }

  // update(id: number, updateTraCuuMaSoThueDto: UpdateTraCuuMaSoThueDto) {
  //   return `This action updates a #${id} traCuuMaSoThue`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} traCuuMaSoThue`;
  // }
}
