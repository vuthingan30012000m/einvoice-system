import { CqrsModule } from '@nestjs/cqrs';

import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';
import { TaxPayerRegisteredEventHandler } from './event-handlers/tax-payer-registered.event-handler';
import { LoginTaxPayerQueryHandler } from './queries/login-tax-payer/login-tax-payer.query-handler';

const UserCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];
const UserEventHandlers: any[] = [TaxPayerRegisteredEventHandler];
const UserQueryHandlers: any[] = [LoginTaxPayerQueryHandler];

export const UserApplications = {
  imports: [CqrsModule],
  providers: [
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
};
