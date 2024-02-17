import { TaxPayerDomainService } from '../domain/tax-payer.domain-service';
import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';

const UserDomainService: any[] = [TaxPayerDomainService];
const UserCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];
const UserEventHandlers: any[] = [];
const UserQueryHandlers: any[] = [];

export const UserApplications = [
  ...UserDomainService,
  ...UserCommandHandlers,
  ...UserEventHandlers,
  ...UserQueryHandlers,
];
