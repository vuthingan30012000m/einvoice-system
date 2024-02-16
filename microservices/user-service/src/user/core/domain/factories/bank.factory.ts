import { Bank } from '../entities/bank';
import { BankId } from '../value-objects/bank-id';
import { BankInformationId } from '../value-objects/bank-information-id';
export class BankBuilder {
  private Bank: Bank;

  constructor(bankId: BankId) {
    this.Bank = new Bank(bankId);
  }
 
  
  
    public withAccountBank(accountBank: string) {
      this.Bank.accountBank = accountBank;
      return this;
    }
  
    public withBankInformationId(bankInformationId: BankInformationId) {
      this.Bank.bankInformationId = bankInformationId;
      return this;
    }
    

  
  build(): Bank {
    return this.Bank;
  }
}

// const bank = Bank.Builder(new BankId('123'))
// .withAccountBank("123")
// .withBankInformationId(new BankInformationId("123"))
// .build();
