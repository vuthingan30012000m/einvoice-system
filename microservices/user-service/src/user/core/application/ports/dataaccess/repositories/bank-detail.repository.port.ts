import { IRepository } from 'src/common/ddd/oop/core/application/ports/dataaccess/repositories/i-repository';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { BankDetailId } from 'src/user/core/domain/value-objects/bank-detail-id';
import { BankId } from 'src/user/core/domain/value-objects/bank-id';

export abstract class BankDetailRepositoryPort implements IRepository<BankDetail> {
  abstract save(entity: BankDetail | BankDetail[]): Promise<BankDetail>;
  abstract getAll(): Promise<BankDetail[]>;
  abstract getOneById(id: BankDetailId): Promise<BankDetail>;
  abstract delete(entity: BankDetail): Promise<boolean>;

  abstract getAccountBank(
    accountBank: string,
    bankId: BankId,
  ): Promise<boolean>;
}
