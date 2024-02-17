import { Address } from './entities/address';
import { Bank } from './entities/bank';
import { BankDetail } from './entities/bank-detail';
import { TaxPayer } from './entities/tax-payer';
import { AddressId } from './value-objects/address-id';
import { BankDetailId } from './value-objects/bank-detail-id';
export class TaxPayerDomainService {
  RegisterTaxPayer(
    taxPayer: TaxPayer,
    bankDetail: BankDetail,
    address: Address,
  ) {
    // return  taxPayer.taxPayerStatus
  }
}
