import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUsbTokenCommand } from './register-usb-token.command';







import { UsbTokenAuthenticationService } from 'src/user/core/domain/services/usb-token-authentication.service';
import { TaxCode } from 'src/user/core/domain/value-objects/tax-code';
import { TaxPayerRepositoryPort } from '../../ports/dataaccess/repositories/tax-payer.repository.port';

@CommandHandler(RegisterUsbTokenCommand)
export class RegisterUsbTokenCommandHandler
  implements ICommandHandler<RegisterUsbTokenCommand>
{
  constructor(
    private readonly UsbTokenAuthenticationService: UsbTokenAuthenticationService,
    private readonly TaxPayerRepository: TaxPayerRepositoryPort,
  ) {}

  private readonly logger = new Logger(RegisterUsbTokenCommandHandler.name);

  public async execute(payload: RegisterUsbTokenCommand) {
    try {
      this.logger.log(`> RegisterUsbTokenCommand: ${JSON.stringify(payload)}`);

      const { usbToken, qrCode } =
        await this.UsbTokenAuthenticationService.generate(
          new TaxCode(payload.taxCode),
        );

      const findTaxPayer = await this.TaxPayerRepository.getOneById(
        new TaxCode(payload.taxCode),
      );
      if (!findTaxPayer) {
        throw new Error('Người nộp thuế không tồn tại.');
      }


      findTaxPayer.registerUsbToken(usbToken);

      await this.TaxPayerRepository.save(findTaxPayer);

      return qrCode;
    } catch (error) {
      this.logger.error(`> ${error}`);
      return { error: error.message };
    }
  }
}
