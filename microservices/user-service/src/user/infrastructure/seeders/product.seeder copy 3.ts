import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSeeder implements OnModuleInit {
  private logger = new Logger(ProductSeeder.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    // const createProductDto={name:"product1"}
    // const newProduct = this.productRepository.create( createProductDto)
    // await this.productRepository.save(newProduct);
    this.logger.log('Seeder successfully!');
  }
}
