export class CreateProductDto {
  readonly name: string;
  readonly unit: string;
  readonly price: number;
  readonly description?: string;
  readonly taxPayerId: string;
  readonly usbToken: string;
}
