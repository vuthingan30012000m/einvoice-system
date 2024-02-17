import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { BankDetailEntity } from '../entities/bank-detail.entity';
import { BankDetailId } from 'src/user/core/domain/value-objects/bank-detail-id';
import { BankId } from 'src/user/core/domain/value-objects/bank-id';
import { BankEntity } from '../entities/bank.entity';

export class BankDetailAdapter {
  static toDomain(BankDetailEntity: BankDetailEntity): BankDetail {
    const BankDetailModel = BankDetail.Builder(
      new BankDetailId(BankDetailEntity.id),
    )
      .withBankId(new BankId(BankDetailEntity.bank.id))
      .withAccountBank(BankDetailEntity.accountBank)
      .build();

    return BankDetailModel;
  }

  static toPersistence(BankDetail: BankDetail): BankDetailEntity {
    const entity = new BankDetailEntity();

    entity.id = BankDetail.id.value;
    entity.accountBank = BankDetail.accountBank;

    const bank = new BankEntity();
    bank.id = BankDetail.BankId.value;

    entity.bank = bank;
    return null;
  }
}
