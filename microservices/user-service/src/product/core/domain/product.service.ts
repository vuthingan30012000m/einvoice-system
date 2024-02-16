// import { Injectable } from '@nestjs/common';
// import { CreateProductCommand } from '../application/commands/create-product/create-product.command';

// @Injectable()
// export class ProductService {
//   constructor() {}

//   async findAll() {
// return await this.productRepository.find();
//   }

//   async findOne(id: string): Promise<Product> {
//     return await this.productRepository.findOneBy({ productId: id });
//   }

//   async update(
//     id: string,
//     updateProductDto: UpdateProductDto,
//   ): Promise<Product> {
//     await this.productRepository.update(id, updateProductDto);
//     return await this.productRepository.findOneBy({ productId: id });
//   }

//   async remove(id: string): Promise<void> {
//     await this.productRepository.delete(id);
//   }
// }
