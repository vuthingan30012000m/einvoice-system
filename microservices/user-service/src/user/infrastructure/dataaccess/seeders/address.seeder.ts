import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
// import * as fs from 'fs';
// import * as path from 'path';
import { CityEntity } from '../entities/city.entity';
import { DistrictEntity } from '../entities/district.entity';
import { WardEntity } from '../entities/ward.entity';
import { dataDistrict } from './data/address.district.data';
import { dataCity } from './data/address.city.data';
import { dataWard } from './data/address.ward.data';

@Injectable()
export class AddressSeeder implements OnModuleInit {
  private logger = new Logger(AddressSeeder.name);

  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(DistrictEntity)
    private readonly districtRepository: Repository<DistrictEntity>,
    @InjectRepository(WardEntity)
    private readonly wardRepository: Repository<WardEntity>,
  ) {}

  async onModuleInit() {
    try {
      for (const item of dataCity) {
        const existingCity = await this.cityRepository.findOneBy({
          id: String(item.id),
        });

        if (existingCity) {
          // await this.cityRepository.update(existingCity.id, {
          // name: item.name,
          // });
        } else {
          const newCity = this.cityRepository.create({
            id: String(item.id),
            name: item.name,
          });

          await this.cityRepository.save(newCity);
        }
      }

      for (const item of dataDistrict) {
        const existingDistrict = await this.districtRepository.findOneBy({
          id: String(item.id),
        });

        if (existingDistrict) {
          // await this.districtRepository.update(existingDistrict.id, {
          // name: item.name,
          // });
        } else {
          const city = await this.cityRepository.findOneBy({
            id: String(item.city),
          });

          const newDistrict = this.districtRepository.create({
            id: String(item.id),
            name: item.name,
            city: city,
          });

          await this.districtRepository.save(newDistrict);
        }
      }

      for (const item of dataWard) {
        const existingWard = await this.wardRepository.findOneBy({
          id: String(item.id),
        });

        if (existingWard) {
          // await this.wardRepository.update(existingWard.id, {
          // name: item.name,
          // });
        } else {
          const district = await this.districtRepository.findOneBy({
            id: String(item.district),
          });

          const newWard = this.wardRepository.create({
            id: String(item.id),
            name: item.name,
            district: district,
          });

          await this.wardRepository.save(newWard);
        }
      }

      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
