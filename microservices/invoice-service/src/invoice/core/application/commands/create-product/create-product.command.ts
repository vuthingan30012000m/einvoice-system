import { ICommand } from '@nestjs/cqrs';
import { Money } from '../../../domain/value-objects/money';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly unit: string,
    public readonly price: Money,
    public readonly description: string,
    public readonly taxPayerId: string,
  ) {}
}
