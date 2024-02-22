import { IRepository } from '@vuvannghia/common';

import { InvoiceItem } from '../../../../domain/entities/invoice-item';
import { InvoiceItemId } from '../../../../domain/value-objects/invoice-item-id';

export abstract class InvoiceItemRepositoryPort
  implements IRepository<InvoiceItem>
{
  abstract save(entity: InvoiceItem | InvoiceItem[]): Promise<InvoiceItem>;
  abstract getAll(): Promise<InvoiceItem[]>;
  abstract getOneById(id: InvoiceItemId): Promise<InvoiceItem>;
  abstract delete(entity: InvoiceItem): Promise<boolean>;
}
