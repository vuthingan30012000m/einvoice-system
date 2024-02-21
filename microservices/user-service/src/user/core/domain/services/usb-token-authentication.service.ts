import { Injectable } from '@nestjs/common';

import { TaxCode } from '../../domain/value-objects/tax-code'
import { authenticator } from 'otplib';

@Injectable()
export class UsbTokenAuthenticationService {
  async generate(taxCode: TaxCode) {
    const usbToken = authenticator.generateSecret();

    const qrCode = authenticator.keyuri(
      taxCode.value,
      process.env.APP_NAME,
      usbToken,
    );

    return { usbToken, qrCode };
  }

  async verify(usbToken: string, usbTokenStore: string) {
    return authenticator.verify({ token: usbToken, secret: usbTokenStore });
  }
}
