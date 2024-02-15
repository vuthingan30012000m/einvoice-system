import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import * as fs from 'fs';
import * as path from 'path';
import { City } from '../entities/city.entity';
import { District } from '../entities/district.entity';
import { Ward } from '../entities/ward.entity';

@Injectable()
export class AddressSeeder implements OnModuleInit {
  private logger = new Logger(AddressSeeder.name);

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async onModuleInit() {
    try {
      const jsonFileCityPath = path.join(__dirname, 'address.city.seeder.json');
      const rawCityData = fs.readFileSync(jsonFileCityPath, 'utf8');

      const dataCity: {
        id: number;
        name: string;
      }[] = JSON.parse(rawCityData);

      for (const item of dataCity) {
        const existingCity = await this.cityRepository.findOneBy({
          id: item.id,
        });

        if (existingCity) {
          await this.cityRepository.update(existingCity.id, {
            name: item.name,
          });
        } else {
          const newCity = this.cityRepository.create({
            id: item.id,
            name: item.name,
          });

          await this.cityRepository.save(newCity);
        }
      }

      // const jsonFileDistrictPath = path.join(
      //   __dirname,
      //   'address.district.seeder.json',
      // );
      // const rawDistrictData = fs.readFileSync(jsonFileDistrictPath, 'utf8');

      // const dataDistrict: {
      //   id: number;
      //   name: string;
      //   city: number;
      // }[] = JSON.parse(rawDistrictData);

      // for (const item of dataDistrict) {
      //   const existingDistrict = await this.districtRepository.findOneBy({
      //     id: item.id,
      //   });

      //   if (existingDistrict) {
      //     await this.districtRepository.update(existingDistrict.id, {
      //       name: item.name,
      //     });
      //   } else {
      //     const newDistrict = this.districtRepository.create({
      //       id: item.id,
      //       name: item.name,
      //     });

      //     await this.districtRepository.save(newDistrict);
      //   }
      // }

      const jsonFileWardPath = path.join(__dirname, 'address.ward.seeder.json');
      const rawWardData = fs.readFileSync(jsonFileWardPath, 'utf8');

      const dataWard: {
        id: number;
        name: string;
        city: number;
      }[] = JSON.parse(rawWardData);

      for (const item of dataWard) {
        console.log('🚀 ~ AddressSeeder ~ onModuleInit ~ item:', item);
        const existingWard = await this.wardRepository.findOneBy({
          id: item.id,
        });

        if (existingWard) {
          await this.wardRepository.update(existingWard.id, {
            name: item.name,
          });
        } else {
          const newWard = this.wardRepository.create({
            id: item.id,
            name: item.name,
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
