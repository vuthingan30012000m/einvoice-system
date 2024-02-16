<!-- Coi nhuw xong domain roi  -->
<!-- DatabaseConfig  -->
<!-- nest g resource   report -->



<!--  -->
init
validation
+ register ()
+ login()
+ logout()

+ forgotPassword()
+ changePassword()


+ getTaxPayer()
+ verifyEmail()

<!-- + updateTaxPayer() -->
<!-- + deleteTaxPayer() -->

<!-- + verifyTaxPayerBank() -->
<!-- + verifyTaxPayerAddress() -->




<!-- model Invoice { -->
  <!-- id               Int           @id @default(autoincrement()) -->
  <!-- total_before_tax Float -->
  <!-- total_after_tax  Float -->
  <!-- date             DateTime -->
  
  <!-- userId           Int -->
  <!-- user             User          @relation(fields: [userId], references: [id]) -->
  
  <!-- customerId       Int -->
  <!-- customer         Customer      @relation(fields: [customerId], references: [id]) -->

  <!-- invoiceItems     InvoiceItem[] -->
}

<!-- model InvoiceItem { -->
  <!-- id        Int     @id @default(autoincrement()) -->
  <!-- unitPrice Float -->
  <!-- quantity  Int -->
  <!-- taxRate   Float -->
  
  <!-- productId Int -->
  <!-- product   Product @relation(fields: [productId], references: [id]) -->

  <!-- invoiceId Int -->
  <!-- invoice   Invoice @relation(fields: [invoiceId], references: [id]) -->
}


<!-- model Product { -->
  <!-- id           Int           @id @default(autoincrement()) -->
  <!-- name         String -->
  <!-- description  String -->
  <!-- price        Float -->
}



<!--  
model Customer {
  id          Int       @id @default(autoincrement())
  name        String
  email       String
  phoneNumber String
  address     Address   @relation(fields: [addressId], references: [id])
  bank        Bank      @relation(fields: [bankId], references: [id])
  addressId   Int
  bankId      String
  Invoice     Invoice[]
} -->