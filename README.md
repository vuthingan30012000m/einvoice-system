<!-- nest g resource   invoice -->
<!-- TaxPayer -->
taxCode: TaxCode
password: string
name: string
email: Email
phoneNumber: PhoneNumber
<!-- address: string -->
<!-- bankName: string -->


<!-- bankNumber: string -->

taxPayerStatus: TaxPayerStatus
createdAt: Date
updatedAt: Date
deletedAt: Date
<!--  -->
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





<!-- Link vẽ draw.io [https://youtu.be/MLlal_jRoXQ?si=mrJDuXwNeud69g0R] -->
<!-- Chủ đề -->
<!-- Lộ trình? -->

Mail
Thông báo
Người dùng
Sản phẩm
Giỏ hàng
Hóa đơn
Chat
Ship
Thanh toán

<!-- Chủ đề: microservices cho hóa đơn điện tử -->
<!-- Chủ đề: microservices cho ddddddddddd -->

ĐÁP ỨNG ĐẦY ĐỦ NGHIỆP VỤ HÓA ĐƠN ĐIỆN TỬ
Phát hành hóa đơn điện tử
Xử lý hóa đơn
Hóa đơn điện tử MISA meInvoice
Thay đổi hoàn toàn cách thức phát hành, quản lý, báo cáo hóa đơn của đơn vị bạn!

<!-- Nội dung tổng quan của đồ án: -->

Các Design patern của microservices
SAGA, Outbox and CQRS patterns
Tìm hiểu DDD

<!-- Vì dùng localhost lên không có CI/CD -->

<!-- Docker và Kubernetes -->

<!-- Istio -->

<!-- Service Registry và Service Discovery dùng Consul -->
<!-- Kafka -->

<!-- Prometheus, grafana, kibana -->

<!-- security: authentication and authorization Oauth? -->


<!-- Load banlancer của Nginx -->

<!-- API gateway -->
<!-- Cache redis -->
<!-- Nhập mã captcha và nhấn “Tìm kiếm” -->

Microservices là một kiến trúc phần mềm phân tán mà mỗi dịch vụ hoạt động độc lập và chạy trên các máy chủ riêng biệt. Các design pattern là các mô hình thiết kế đã được kiểm chứng trong việc triển khai các microservices. Dưới đây là một số design pattern phổ biến cho microservices:

1. **Service Discovery**:
   - Pattern này giúp các dịch vụ khám phá lẫn nhau để tương tác. Các công cụ như Eureka, Consul hoặc ZooKeeper thường được sử dụng để quản lý và tìm kiếm dịch vụ.

2. **API Gateway**:
   - API Gateway là một lớp trung gian giữa các client và các dịch vụ microservices. Nó quản lý yêu cầu và phản hồi, cung cấp các tính năng như xác thực, bảo mật, và routing.

3. **Circuit Breaker**:
   - Circuit Breaker pattern giúp ứng dụng xác định khi một dịch vụ hoạt động không đúng cách và tự động ngắt kết nối để tránh gây ra sự cố hệ thống rộng lớn.

4. **Retry**:
   - Pattern này cho phép ứng dụng thử lại gửi yêu cầu đến một dịch vụ nếu gặp lỗi ban đầu.

5. **Saga Pattern**:
   - Saga là một loạt các bước giao dịch phức tạp được thực hiện qua nhiều dịch vụ, và nó đảm bảo tính nhất quán trong việc thực hiện giao dịch phức tạp.

6. **Event Sourcing**:
   - Pattern này liên quan đến việc lưu trữ và quản lý trạng thái của ứng dụng bằng cách lưu trữ tất cả sự kiện đã xảy ra thay vì chỉ lưu trạng thái hiện tại.

7. **Choreography vs. Orchestration**:
   - Pattern này liên quan đến cách các dịch vụ tương tác với nhau. Orchestration đề cập đến việc có một dịch vụ trung tâm điều khiển tất cả các tương tác, trong khi Choreography là việc các dịch vụ tương tác trực tiếp thông qua sự kiện hoặc thông điệp.

8. **Bulkhead**:
   - Pattern này đảm bảo rằng lỗi trong một dịch vụ không ảnh hưởng đến các dịch vụ khác bằng cách chia các dịch vụ vào các khu vực an toàn (bulkhead) riêng biệt.

9. **Database per Service**:
   - Mỗi dịch vụ có cơ sở dữ liệu riêng, giúp tách biệt dữ liệu giữa các dịch vụ và giảm sự phụ thuộc.

10. **Polyglot Microservices**:
    - Cho phép sử dụng nhiều ngôn ngữ lập trình và công nghệ khác nhau cho mỗi dịch vụ, tùy theo yêu cầu cụ thể của dịch vụ đó.

Nhớ rằng việc lựa chọn design pattern phù hợp phụ thuộc vào nhu cầu cụ thể của dự án microservices của bạn. Việc thiết kế tốt và tuân theo các nguyên tắc cơ bản của microservices như độc lập, chia sẻ dữ liệu thông qua giao tiếp và quản lý sự cố là quan trọng.











