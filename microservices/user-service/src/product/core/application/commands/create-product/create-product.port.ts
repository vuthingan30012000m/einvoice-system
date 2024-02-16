import { Product } from '../../../domain/entities/product';
export abstract class CreateProductPort {
  abstract save(product: Product): Promise<Product>;
}
