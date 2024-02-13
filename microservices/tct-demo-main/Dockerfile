# Sử dụng ảnh chứa Node.js
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Build the TypeScript code
RUN npm run build

# Mở cổng ứng dụng cần sử dụng (ví dụ: cổng 3000)
EXPOSE 3001

# Khởi chạy ứng dụng khi container được khởi động 
CMD ["node", "dist/main"]
