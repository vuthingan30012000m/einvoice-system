import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressSeeder implements OnModuleInit {
  private logger = new Logger(AddressSeeder.name);

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async onModuleInit() {
    // const createAddressDto={name:"Address1"}
    // const newAddress = this.AddressRepository.create( createAddressDto)
    // await this.AddressRepository.save(newAddress);
    this.logger.log('Seeder successfully!');
  }
}
