insert into categories (slug, name, description, image_url, sort_order) values
('bo-hoa-tot-nghiep', 'Bó hoa tốt nghiệp', 'Tone tươi sáng cho lễ tốt nghiệp.', '/images/category-graduation.jpg', 1),
('hoa-sinh-nhat', 'Hoa sinh nhật', 'Hoa tặng sinh nhật giao trong ngày.', '/images/category-birthday.jpg', 2),
('hoa-khai-truong', 'Hoa khai trương', 'Giỏ hoa và kệ hoa chúc mừng.', '/images/category-opening.jpg', 3),
('hoa-theo-yeu-cau', 'Hoa theo yêu cầu', 'Thiết kế theo tone và ngân sách riêng.', '/images/category-custom.jpg', 4);

insert into products (category_id, slug, name, sku, description, price, sale_price, image_url, stock_quantity, featured) values
((select id from categories where slug = 'bo-hoa-tot-nghiep'), 'sunshine-graduate', 'Sunshine Graduate', 'NX-GR-001', 'Bó hướng dương phối baby trắng, giấy kraft kem và nơ satin.', 320000, 289000, '/images/product-sunshine.jpg', 18, true),
((select id from categories where slug = 'bo-hoa-tot-nghiep'), 'nana-baby-pink', 'Nana Baby Pink', 'NX-GR-002', 'Baby trắng mix hồng pastel, bó tròn nhỏ xinh.', 280000, 249000, '/images/product-baby-pink.jpg', 24, true),
((select id from categories where slug = 'hoa-sinh-nhat'), 'dau-ngot-diu-dang', 'Dâu Ngọt Dịu Dàng', 'NX-BD-001', 'Hoa hồng dâu phối cát tường trắng.', 430000, 389000, '/images/product-dau-ngot.jpg', 12, true),
((select id from categories where slug = 'hoa-sinh-nhat'), 'muse-cam-tu-cau', 'Muse Cẩm Tú Cầu', 'NX-BD-002', 'Cẩm tú cầu xanh nhạt, hồng kem và lá bạc.', 520000, 479000, '/images/product-cam-tu-cau.jpg', 9, true);
