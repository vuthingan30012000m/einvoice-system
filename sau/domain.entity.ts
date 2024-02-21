export abstract class DomainEntity<T> {
  protected readonly _id: T;

  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;

  constructor(id: T) {
    this._id = id;
  }

  public get id(): T {
    return this._id;
  }

  public equals(object?: DomainEntity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof DomainEntity)) {
      return false;
    }

    return this._id === object._id;
  }
}
