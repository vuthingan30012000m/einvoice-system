import { DomainEntity } from '../../../../../microservices/user-service/src/common/core/domain/entities/base-entity';

export abstract class AggregateRoot<T> extends DomainEntity<T> {}
