import { IRepository } from 'src/common/ddd/oop/core/application/ports/dataaccess/repositories/repository';
import { Address } from 'src/user/core/domain/entities/address';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';

export abstract class AddressRepository implements IRepository<Address> {
  abstract save(entity: Address | Address[]): Promise<Address>;
  abstract getAll(): Promise<Address[]>;
  abstract getOneById(id: AddressId): Promise<Address>;
  abstract delete(entity: Address): Promise<boolean>;
}
