# Tiệm hoa Nana Xinh

Monorepo cho website Tiệm hoa Nana Xinh.

## Stack

- Frontend: ReactJS, Vite, JavaScript, React Router
- Backend: Java 21, Spring Boot, Spring Data JPA
- Database: PostgreSQL, Flyway
- Deploy: Docker Compose, Nginx serve frontend và reverse proxy `/api`

## Chạy frontend local

```bash
npm --prefix frontend install
npm run dev:frontend
```

Frontend dùng Node `>=26`.

## Chạy production bằng Docker Compose

```bash
copy .env.example .env
docker compose up --build
```

Ứng dụng sẽ chạy qua Nginx tại `http://localhost`, API đi qua `http://localhost/api`.

## Auth admin

Backend có JWT auth cho tài khoản quản trị:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

Admin mặc định được tạo lần đầu bằng biến môi trường:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

Frontend login dev mặc định dùng `admin@nanaxinh.vn` / `admin123`. Khi backend chạy, frontend sẽ gọi API thật qua `/api`; nếu backend chưa bật, login mock vẫn giúp mở dashboard để tiếp tục làm giao diện.

## Ghi chú local

Máy hiện tại có Node `v26.7.0`. Backend được cấu hình Java 21 và có thể build qua Docker image Maven/Temurin 21; nếu muốn chạy backend trực tiếp bằng `mvn`, cần cài JDK 21 và Maven.
