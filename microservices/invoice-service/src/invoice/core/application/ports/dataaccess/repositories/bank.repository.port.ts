import { IRepository } from '@vuvannghia/common';
import { Bank } from 'src/invoice/core/domain/entities/bank';
import { BankId } from 'src/invoice/core/domain/value-objects/bank-id';

export abstract class BankRepositoryPort implements IRepository<Bank> {
  abstract save(entity: Bank | Bank[]): Promise<Bank>;
  abstract getAll(): Promise<Bank[]>;
  abstract getOneById(id: BankId): Promise<Bank>;
  abstract delete(entity: Bank): Promise<boolean>;
}