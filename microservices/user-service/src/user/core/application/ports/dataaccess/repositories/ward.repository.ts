import { IRepository } from 'src/common/ddd/oop/core/application/ports/dataaccess/repositories/repository';
import { Ward } from 'src/user/core/domain/entities/ward';
import { WardId } from 'src/user/core/domain/value-objects/ward-id';

export abstract class WardRepository implements IRepository<Ward> {
  abstract save(entity: Ward | Ward[]): Promise<Ward>;
  abstract getAll(): Promise<Ward[]>;
  abstract getOneById(id: WardId): Promise<Ward>;
  abstract delete(entity: Ward): Promise<boolean>;
}
