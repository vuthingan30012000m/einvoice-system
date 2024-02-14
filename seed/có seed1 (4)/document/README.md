<!-- 2BanDauSwaggerSQL -->

npm i @nestjs/swagger
npm i @nestjs/typeorm typeorm mysql2
npm i class-validator class-transformer

<!-- tra cứu MST -->
<!-- Tạo Cơ quan thuế và Thông tin người nộp thuế -->

nest g resource TraCuuMaSoThue --no-spec
CoQuanThue(MaCoQuanThue, TenCoQuanThue )
NguoiNopThue(MaSoThue,TenNguoiNopThue,NgaySinh,MaCoQuanThue)
Bảng "CoQuanThue" lưu trữ thông tin về cơ quan thuế, trong khi bảng "NguoiNopThue" lưu trữ thông tin về người nộp thuế đăng ký.
Có mối quan hệ giữa hai bảng thông qua cột "MaCoQuan" trong bảng "NguoiNopThue," thể hiện mối quan hệ giữa người nộp thuế và cơ quan thuế mà họ đăng ký.

<!-- validation MST-->

<!-- Ngẫu nhiên  tên -->

npm install faker
npm audit fix --force
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
return `${firstName} ${lastName}`;

<!-- Seeder -->

nest g resource Seeder --no-spec
<!-- co_quan_thue.json -->
nest-cli.json
<!-- "assets": ["seeder/**/*"], -->
<!-- Xong Seeder -->
