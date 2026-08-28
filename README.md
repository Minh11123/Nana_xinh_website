# Nana Xinh — frontend-only

Website bán hoa chạy hoàn toàn ở frontend (React + Vite). Không cần backend, database hay tài khoản admin.

## Cập nhật sản phẩm và ảnh

Toàn bộ danh mục/sản phẩm nằm trong `src/data/catalog.js`.

1. Tải ảnh lên Google Drive.
2. Chọn **Chia sẻ → Quyền truy cập chung → Bất kỳ ai có đường liên kết**.
3. Sao chép link dạng `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`.
4. Dán link vào trường `imageUrl` của sản phẩm hoặc danh mục.

Website tự chuyển link chia sẻ Drive thành link hiển thị ảnh. Có thể tiếp tục dùng ảnh trong `public/images` bằng đường dẫn `/images/ten-anh.jpg`.

Thông tin cửa hàng/Zalo nằm trong `src/data/store.js`.

## Trang quản trị ẩn

Mở `/nana-xinh-quan-ly` để thêm sản phẩm và banner quảng cáo cuộn bằng link ảnh Google Drive. Route này không xuất hiện trên menu. Nội dung thêm từ trang quản trị được lưu trong `localStorage`, nên chỉ hiển thị trên đúng trình duyệt/thiết bị đã thêm và không đồng bộ cho khách ở thiết bị khác.

## Đặt hàng

Giỏ hoa được lưu bằng `localStorage` trên trình duyệt. Trang đặt hàng tạo nội dung đơn, sao chép vào clipboard và mở Zalo để khách gửi trực tiếp cho tiệm. Website không thu thập hoặc lưu thông tin khách hàng.

## Chạy dự án

```bash
npm install
npm run dev
```

Kiểm tra bản production:

```bash
npm run build
```
