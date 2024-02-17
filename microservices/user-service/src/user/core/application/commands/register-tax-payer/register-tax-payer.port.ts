export abstract class RegisterTaxPayerPort {
    abstract getWardById(wardId: string): Promise<any>;
    abstract getBankById(bankId: string): Promise<any>;
    abstract saveAddress(address: any): Promise<any>;
    abstract saveBankDetail(bankDetail: any): Promise<any>;
    abstract saveTaxPayer(taxPayer: any): Promise<any>;
}
