import { IRepository } from 'src/common/ddd/oop/core/application/ports/dataaccess/repositories/repository';
import { Bank } from 'src/user/core/domain/entities/bank';
import { BankId } from 'src/user/core/domain/value-objects/bank-id';

export abstract class BankRepository implements IRepository<Bank> {
  abstract save(entity: Bank | Bank[]): Promise<Bank>;
  abstract getAll(): Promise<Bank[]>;
  abstract getOneById(id: BankId): Promise<Bank>;
  abstract delete(entity: Bank): Promise<boolean>;
}
