touch   





{
"taxCode": "6aadf840-dedb-450f-877c-9d240a9c5cff",
"password": "nL1TRlHB4YNZbp6"
}


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YXhDb2RlIjoiM2ViNTdlNmItMzY3Zi00OTJkLTk0NGEtYTU3ZDdmYWQzYWNmIiwiaWF0IjoxNzA4MjcyNDYwLCJleHAiOjE3MDgyNzI3NjB9.PzFV7sC4A650kaODycHee9P5Oru3YiK2rW3prcSP4N8

.addBearerAuth();
<!-- html -->

<!-- user=api=tct -->


<!-- len name -->
<!-- len passs -->
<!-- typeorm migration -->

  <!-- createdAt: Date; -->
  <!-- updatedAt: Date; -->
  <!-- deletedAt: Date; -->

Crud
Jwt
Crud onvoice
<!-- Đổi mật khẩu -->
Factory
AR




<!--   jsonwebtoken     -->
tãcode
status
active moiws ddc

  <!-- PENDING = 'PENDING', -->
  <!-- VERIFY_EMAIL = 'VERIFY_EMAIL', -->
  USB_TOKEN = 'USB_TOKEN',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
 
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









@Get('register-usb-token')
@ApiBearerAuth()
@ApiOperation({ summary: 'Đăng ký  chữ ký số USB Token' })
async registerUsbTokenHandler(
  @TaxPayer() TaxPayer: TaxPayerJwtPayload,
  @Res() Response: Response,
) {
  if (!TaxPayer) {
    return 'Hãy đăng nhập để thực hiện chức năng này.';
  }

  Response.type('png');

  const result = await this.registerUsbToken(TaxPayer);
  result.subscribe((data: string | QRCodeSegment[]) => {
    toFileStream(Response, data);
  });
}

registerUsbToken(TaxPayer: TaxPayerJwtPayload) {
  return this.natsClient.send(
    { cmd: 'register-usb-token' },
    { taxCode: TaxPayer.taxCode },
  );
}
