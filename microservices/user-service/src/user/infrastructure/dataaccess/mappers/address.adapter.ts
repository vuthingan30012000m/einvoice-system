import { Address } from 'src/user/core/domain/entities/address';
import { AddressEntity } from '../entities/address.entity';
import { AddressId } from 'src/user/core/domain/value-objects/address-id';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';
import { WardEntity } from '../entities/ward.entity';

export class AddressAdapter {
  static toDomain(AddressEntity: AddressEntity): Address {
    const AddressModel = Address.Builder(new AddressId(AddressEntity.id))
      .withWardId(new WardId(AddressEntity.ward.id))
      .withNoteAddress(AddressEntity.note)
      .build();

    return AddressModel;
  }

  static toPersistence(Address: Address): AddressEntity {
    const entity = new AddressEntity();

    entity.id = Address.id.value;

    entity.note = Address.note;

    const ward = new WardEntity();
    ward.id = Address.WardId.value;
    entity.ward = ward;

    return null;
  }
}
