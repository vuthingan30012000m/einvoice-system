import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';
import { LoginTaxPayerQueryHandler } from './queries/login-tax-payer/login-tax-payer.query-handler';

const UserCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];
const UserEventHandlers: any[] = [];
const UserQueryHandlers: any[] = [LoginTaxPayerQueryHandler];

export const UserApplications = [
  ...UserCommandHandlers,
  ...UserEventHandlers,
  ...UserQueryHandlers,
];
