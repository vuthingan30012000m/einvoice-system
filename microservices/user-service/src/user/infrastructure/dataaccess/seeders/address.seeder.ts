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
      var jsonFilePath = path.join(__dirname, 'address.city.seeder.json');
      var rawData = fs.readFileSync(jsonFilePath, 'utf8');

      var data: {
        id: number;
        name: string;
      }[] = JSON.parse(rawData);

      for (const item of data) {
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

      // var jsonFilePath = path.join(__dirname, 'address.district.seeder.json');
      // var rawData = fs.readFileSync(jsonFilePath, 'utf8');

      // var data: {
      //   id: number;
      //   name: string;
      // }[] = JSON.parse(rawData);

      // for (const item of data) {
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

      // var jsonFilePath = path.join(__dirname, 'address.ward.seeder.json');
      // var rawData = fs.readFileSync(jsonFilePath, 'utf8');

      // var data: {
      //   id: number;
      //   name: string;
      // }[] = JSON.parse(rawData);

      // for (const item of data) {
      //   const existingWard = await this.wardRepository.findOneBy({
      //     id: item.id,
      //   });

      //   if (existingWard) {
      //     await this.wardRepository.update(existingWard.id, {
      //       name: item.name,
      //     });
      //   } else {
      //     const newWard = this.wardRepository.create({
      //       id: item.id,
      //       name: item.name,
      //     });

      //     await this.wardRepository.save(newWard);
      //   }
      // }

      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
