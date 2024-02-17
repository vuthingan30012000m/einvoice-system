import { Address } from 'src/user/core/domain/entities/address';
import { BankDetail } from 'src/user/core/domain/entities/bank-detail';
import { TaxPayer } from 'src/user/core/domain/entities/tax-payer';

export abstract class RegisterTaxPayerPort {
  abstract getWardById(wardId: string);
  abstract getBankById(bankId: string);
  abstract saveAddress(address: Address);
  abstract saveBankDetail(bankDetail: BankDetail);
  abstract saveTaxPayer(taxPayer: TaxPayer);
}
