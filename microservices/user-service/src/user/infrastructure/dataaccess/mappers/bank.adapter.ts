import { BankEntity } from '../entities/bank.entity';
import { Bank } from 'src/user/core/domain/entities/bank';

import { BankId } from 'src/user/core/domain/value-objects/bank-id';

export class BankAdapter {
  static toDomain(BankEntity: BankEntity): Bank {
    if (!BankEntity) return null;

    const BankModel = new Bank(new BankId(BankEntity.id));
    BankModel.name = BankEntity.name;
    BankModel.code = BankEntity.code;
    BankModel.shortName = BankEntity.shortName;
    return BankModel;
  }

  static toPersistence(Bank: Bank): BankEntity {
    if (!Bank) return null;

    const entity = new BankEntity();

    entity.id = Bank.id.value;
    entity.name = Bank.name;
    entity.code = Bank.code;
    entity.shortName = Bank.shortName;

    return entity;

  }
}
