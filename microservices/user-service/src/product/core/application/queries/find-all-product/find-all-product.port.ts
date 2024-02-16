import { Product } from '../../../domain/entities/product';
export abstract class FindAllProductPort {
  abstract findAll(): Promise<Product[]>;
}
