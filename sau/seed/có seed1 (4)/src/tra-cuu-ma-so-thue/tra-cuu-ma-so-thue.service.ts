import { Injectable, NotFoundException } from '@nestjs/common';
import { TraCuuMaSoThueDto } from './dto/tra-cuu-ma-so-thue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoQuanThue } from './entities/co-quan-thue.entity';
import { EntityManager, Repository } from 'typeorm';
import { NguoiNopThue } from './entities/nguoi-nop-thue.entity';
import * as faker from 'faker';

@Injectable()
export class TraCuuMaSoThueService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(NguoiNopThue)
    private nguoiNopThueRepository: Repository<NguoiNopThue>,
  ) {}

  async timKiemTheoMaSoThue(maSoThue: string) {
    return await this.nguoiNopThueRepository.findOne({
      where: {
        MaSoThue: maSoThue,
      },
      relations: {
        CoQuanThueQuanLy: true,
      },
    });
  }

  async taoThongTinNgauNhien(maSoThue: string) {
    const randomCoQuanThue = await this.entityManager
      .createQueryBuilder(CoQuanThue, 'coQuanThue')
      .select()
      .orderBy('RAND()')
      .take(1)
      .getOne();

    const createdNguoiNopThue = this.nguoiNopThueRepository.create({
      MaSoThue: maSoThue,
      TenNguoiNopThue: `${faker.name.firstName()} ${faker.name.lastName()}`,
      CoQuanThueQuanLy: randomCoQuanThue,
    });

    return await this.nguoiNopThueRepository.save(createdNguoiNopThue);
  }

  async traCuuMaSoThue(traCuuMaSoThueDto: TraCuuMaSoThueDto) {
    const findNguoiNopThue = await this.timKiemTheoMaSoThue(
      traCuuMaSoThueDto.MaSoThue,
    );

    if (findNguoiNopThue) {
      return findNguoiNopThue;
    }

    if (traCuuMaSoThueDto.MaSoThue.length === 14) {
      const maSoThueDoanhNghiep: string =
        traCuuMaSoThueDto.MaSoThue.split('-')[0];

      const findDoanhNghiep =
        await this.timKiemTheoMaSoThue(maSoThueDoanhNghiep);

      if (!findDoanhNghiep) {
        throw new NotFoundException(
          'Doanh nghiệp chính chưa sử dụng hóa đơn điện tử theo Nghị định 123/2020/NĐ-CP',
        );
      }
    }

    return await this.taoThongTinNgauNhien(traCuuMaSoThueDto.MaSoThue);
  }
}
