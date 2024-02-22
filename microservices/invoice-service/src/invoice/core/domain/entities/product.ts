import { ProductId } from '../value-objects/product-id';

export class Product   {
  productId:ProductId
  name: string;
  unit: string;
  description: string;
  // price:  Money

  constructor(productId: ProductId) {
    this.productId=productId
  }
}
// class Money {
//   private amount: number;

//   constructor(amount: number) {
//       this.amount = amount;
//   }


//   add(money: Money): Money {
//       return new Money(this.amount + money.getAmount());
//   }

//   subtract(money: Money): Money {
//       return new Money(this.amount - money.getAmount());
//   }

//   multiply(factor: number): Money {
//       return new Money(this.amount * factor);
//   }

//   divide(divisor: number): Money {
//       if (divisor === 0) {
//           throw new Error("Cannot divide by zero");
//       }
//       return new Money(this.amount / divisor);
//   }

// }
