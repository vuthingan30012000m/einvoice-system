import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';

const UserCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];
const UserEventHandlers: any[] = [];
const UserQueryHandlers: any[] = [];

export const UserApplications = [
  ...UserCommandHandlers,
  ...UserEventHandlers,
  ...UserQueryHandlers,
];
