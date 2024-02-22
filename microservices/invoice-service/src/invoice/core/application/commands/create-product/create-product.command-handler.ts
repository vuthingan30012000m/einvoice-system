import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductRepositoryPort } from '../../ports/dataaccess/repositories/product.repository.port';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';
import { ProductId } from '../../../domain/value-objects/product-id';
import { randomUUID } from 'crypto';
import { Product } from '../../../domain/entities/product';
import { TaxCode } from '../../../domain/value-objects/tax-code';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly ProductRepository: ProductRepositoryPort,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationServicePort,
  ) {}

  private readonly logger = new Logger(CreateProductCommandHandler.name);

  public async execute(payload: CreateProductCommand) {
    try {
      this.logger.log(`>  payload: ${JSON.stringify(payload)}`);

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxPayerId),
      );
      if (!findTaxPayer) {
        throw new Error('Người nộp thuế không tồn tại.');
      }

      const isValidUsbToken = await this.UsbTokenAuthenticationService.verify(
        payload.usbToken,
        findTaxPayer.usbToken,
      );

      if (!isValidUsbToken) {
        // throw new TaxPayerException('Chữ ký số không đúng.');
      }

      const newProduct = Product.Builder(new ProductId(randomUUID()))
        .withName(payload.name)
        .withUnit(payload.unit)
        .withPrice(payload.price)
        .withDescription(payload.description)
        .withTaxPayerId(new TaxCode(payload.taxPayerId))
        .build();

      return await this.ProductRepository.save(newProduct);
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { message: error.message };
    }
  }
}
