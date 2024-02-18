export interface IRepository<Entity> {
  save(entity: Entity | Entity[]): Promise<Entity>;
  getAll(): Promise<Entity[]>;
  getOneById(id: any): Promise<Entity>;
  delete(entity: Entity): Promise<boolean>;
}
