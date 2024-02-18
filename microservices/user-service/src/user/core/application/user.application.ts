import { CqrsModule } from '@nestjs/cqrs';

import { RegisterTaxPayerCommandHandler } from './commands/register-tax-payer/register-tax-payer.command-handler';
import { TaxPayerRegisteredEventHandler } from './event-handlers/tax-payer-registered.event-handler';
import { LoginTaxPayerQueryHandler } from './queries/login-tax-payer/login-tax-payer.query-handler';
import { VerifyEmailTaxPayerCommandHandler } from './commands/verify-email-tax-payer/verify-email-tax-payer.command-handler';
import { HashPasswordService } from '../domain/services/hash-password.service';
import { EncryptionEmailService } from '../domain/services/encryption-email.service';
import { RegisterUsbTokenCommandHandler } from './commands/register-usb-token/register-usb-token.command-handler';
import { UsbTokenAuthenticationService } from '../domain/services/usb-token-authentication.service';

const UserDomainServices: any[] = [EncryptionEmailService, HashPasswordService];
const UserCommandHandlers: any[] = [
  RegisterTaxPayerCommandHandler,
  VerifyEmailTaxPayerCommandHandler,
  RegisterUsbTokenCommandHandler,
];
const UserEventHandlers: any[] = [TaxPayerRegisteredEventHandler];
const UserQueryHandlers: any[] = [LoginTaxPayerQueryHandler];

export const UserApplications = {
  imports: [CqrsModule],
  providers: [
    ...UserDomainServices,
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
};
