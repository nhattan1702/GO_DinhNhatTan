

## Mục Lục
- [Cài Đặt Backend (Laravel)](#cài-đặt-backend-laravel)
- [Cài Đặt Frontend (ReactJS)](#cài-đặt-frontend-reactjs)
- [Thiết Lập Cơ Sở Dữ Liệu MySQL](#thiết-lập-cơ-sở-dữ-liệu-mysql)
- [Chạy Ứng Dụng](#chạy-ứng-dụng)

---

## Cài Đặt Backend (Laravel)
```bash
# Clone dự án từ GitHub và điều hướng vào thư mục backend
git clone https://github.com/nhattan1702/GO_DinhNhatTan.git


cd server/g-scores

# Cài đặt các package PHP bằng Composer
composer install

# Tạo file .env bằng cách sao chép file .env.example
cp .env.example .env

# Tạo khóa ứng dụng Laravel
php artisan key:generate

# Mở file .env và cập nhật các thông tin kết nối MySQL như sau:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=g-scores
# DB_USERNAME=your_database_username
# DB_PASSWORD=your_database_password

# Chạy Migrations để tạo bảng trong cơ sở dữ liệu
php artisan migrate

# Thêm dữ liệu mẫu vào cơ sở dữ liệu seeders
php artisan db:seed


# Khởi động Backend
php artisan serve
```

## Cài Đặt Frontend (React)
```bash
cd client/g-scores

# Cài đặt các package của React bằng npm
npm install

# Khởi động Frontend
npm start

```
# Tạo cơ sở dữ liệu cho dự án
```bash

CREATE DATABASE g-scores

