import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';

const UserQueryHandlers: any[] = [];
const UserCommandHandlers: any[] = [RegisterTaxPayerCommandHandler];

export const UserApplications = [...UserQueryHandlers, ...UserCommandHandlers];
