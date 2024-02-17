import { AddressId } from './../../../core/domain/value-objects/address-id';
import { WardId } from './../../../core/domain/value-objects/ward-id';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterTaxPayerPort } from 'src/user/core/application/commands/register-tax-payer/register-tax-payer.port';
import { Repository } from 'typeorm';
import { WardEntity } from '../entities/ward.entity';
import { BankEntity } from '../entities/bank.entity';
import { AddressEntity } from '../entities/address.entity';
import { Address } from 'src/user/core/domain/entities/address';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { BankDetailEntity } from '../entities/bank-detail.entity';

@Injectable() 
export class OrmRepository implements RegisterTaxPayerPort {
  constructor(
    @InjectRepository(WardEntity)
    private readonly WardEntityRepository: Repository<WardEntity>,
    @InjectRepository(BankEntity)
    private readonly BankEntityRepository: Repository<BankEntity>,
    @InjectRepository(AddressEntity)
    private readonly AddressEntityRepository: Repository<AddressEntity>,
    @InjectRepository(BankDetailEntity)
    private readonly BankDetailEntityRepository: Repository<BankDetailEntity>,
  ) {}
  async getWardById(wardId: string) {
    return await this.WardEntityRepository.findOneBy({
      id: Number(wardId),
    });
  }
  async getBankById(bankId: string) {
    return await this.BankEntityRepository.findOneBy({
      id: Number(bankId),
    });
  }
  async saveAddress(address: Address) {
    const ward = await this.WardEntityRepository.findOneBy({
      id: Number(address.WardId.value),
    });

    const newAddress = this.AddressEntityRepository.create({
      id: address.id.value,
      note: address.note,
      ward: ward,
    });

    await this.AddressEntityRepository.save(newAddress);
  }
  async saveBankDetail(bankDetail: BankDetail) {
    const bank = await this.BankEntityRepository.findOneBy({
      id: Number(bankDetail.BankId.value),
    });

    const newBankDetail = this.BankDetailEntityRepository.create({
      id: bankDetail.id.value,
      accountBank: bankDetail.accountBank,
      bank: bank,
    });

    await this.BankDetailEntityRepository.save(newBankDetail);
  }
  saveTaxPayer(taxPayer: TaxPayer) {
    return null;
  }

  //   accountBank: '53074617'
  // 🚀 ~ execute ~ newTaxPayer: TaxPayer {
  //   _id: TaxCode { value: '5d61fc31-0366-46f1-9b88-f00b59ec742d' },
  //   name: 'Arturo Luettgen',
  //   password: '_H5EHIukPY8AdgT',
  //   email: Email { value: 'Olin_Rosenbaum@yahoo.com' },
  //   phoneNumber: PhoneNumber { value: '1-372-882-1463 x445' },
  //   taxOfficeId: TaxOfficeId { value: '1054029' },
  //   bankDetailId: BankDetailId { value: '189140ec-3574-4395-9e0f-b94fbea01803' },
  //   addressId: AddressId { value: '03f8d518-1369-4dcb-890c-a19dec07ca7b' }
  // }
  // async save(product: Product): Promise<Product> {
  //   const persistenceModel = ProductAdapter.toPersistence(product);
  //   const newEntity = await this.productRepository.save(persistenceModel);
  //   return ProductAdapter.toDomain(newEntity);
  // }

  // async findAll(): Promise<Product[]> {
  //   const entities = await this.productRepository.find();

  //   return entities.map((item) => ProductAdapter.toDomain(item));
  // }
}

// import { Product } from 'src/product/core/domain/entities/product';
// import { ProductEntity } from '../entities/product.entity';
// import { ProductAdapter } from '../mappers/product.adapter';

// import { CreateProductPort } from 'src/product/core/application/commands/create-product/create-product.port';
// import { FindAllProductPort } from 'src/product/core/application/queries/find-all-product/find-all-product.port';

// @Injectable()
// export class OrmProductRepository
//   implements CreateProductPort, FindAllProductPort
// {
//   constructor(
//     @InjectRepository(ProductEntity)
//     private readonly productRepository: Repository<ProductEntity>,
//   ) {}

//   async save(product: Product): Promise<Product> {
//     const persistenceModel = ProductAdapter.toPersistence(product);
//     const newEntity = await this.productRepository.save(persistenceModel);
//     return ProductAdapter.toDomain(newEntity);
//   }

//   async findAll(): Promise<Product[]> {
//     const entities = await this.productRepository.find();

//     return entities.map((item) => ProductAdapter.toDomain(item));
//   }
// }
