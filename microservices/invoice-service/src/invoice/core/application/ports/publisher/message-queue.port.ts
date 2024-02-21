export abstract class MessageQueuePort {
  // abstract connect(): Promise<void>; // Phương thức kết nối tới message queue
  // abstract disconnect(): Promise<void>; // Phương thức ngắt kết nối từ message queue
  abstract sendMessage(pattern: string, data: any);
  // abstract receiveMessage(): Promise<any>; // Phương thức nhận tin nhắn từ message queue
  // abstract acknowledgeMessage(): Promise<void>; // Phương thức xác nhận đã nhận tin nhắn
  // abstract listen(callback: (message: any) => void): Promise<void>; // Phương thức lắng nghe tin nhắn và gọi hàm callback khi nhận được tin nhắn mới
}
