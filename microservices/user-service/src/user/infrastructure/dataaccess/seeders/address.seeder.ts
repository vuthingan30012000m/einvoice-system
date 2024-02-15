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
      const rawDataCity = fs.readFileSync(jsonFileCityPath, 'utf8');

      const data: {
        id: number;
        name: string;
      }[] = JSON.parse(rawDataCity);

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
      this.logger.log('District successfully!');
      this.logger.log('Ward successfully!');

      this.logger.log('Seeder successfully!');
    } catch (error) {
      this.logger.error('Error seeding data:', error);
    }
  }
}
