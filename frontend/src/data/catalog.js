import { toDisplayImageUrl } from '../utils/driveImage.js'

// Cập nhật catalog tại đây. imageUrl nhận cả đường dẫn local và link chia sẻ Google Drive.
// Ví dụ Drive: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
const categoryData = [
  {
    id: 1,
    name: 'Bó hoa tốt nghiệp',
    slug: 'bo-hoa-tot-nghiep',
    description: 'Tone tươi sáng, gọn tay, hợp chụp ảnh kỷ yếu và lễ tốt nghiệp.',
    imageUrl: '/images/category-graduation.jpg',
  },
  {
    id: 2,
    name: 'Hoa sinh nhật',
    slug: 'hoa-sinh-nhat',
    description: 'Những bó hoa ngọt ngào, dễ thương, giao nhanh trong ngày.',
    imageUrl: '/images/category-birthday.jpg',
  },
  {
    id: 3,
    name: 'Hoa khai trương',
    slug: 'hoa-khai-truong',
    description: 'Thiết kế nổi bật cho ngày mở bán, ra mắt cửa hàng và chúc mừng.',
    imageUrl: '/images/category-opening.jpg',
  },
  {
    id: 4,
    name: 'Hoa theo yêu cầu',
    slug: 'hoa-theo-yeu-cau',
    description: 'Chọn tone, ngân sách và lời nhắn để Nana Xinh phối riêng.',
    imageUrl: '/images/category-custom.jpg',
  },
]

const productData = [
  {
    id: 101,
    categoryId: 1,
    name: 'Sunshine Graduate',
    slug: 'sunshine-graduate',
    sku: 'NX-GR-001',
    price: 320000,
    salePrice: 289000,
    imageUrl: '/images/product-sunshine.jpg',
    description: 'Bó hướng dương phối baby trắng, giấy kraft kem và nơ satin.',
    featured: true,
  },
  {
    id: 102,
    categoryId: 1,
    name: 'Nana Baby Pink',
    slug: 'nana-baby-pink',
    sku: 'NX-GR-002',
    price: 280000,
    salePrice: 249000,
    imageUrl: '/images/product-baby-pink.jpg',
    description: 'Baby trắng mix hồng pastel, bó tròn nhỏ xinh và lên hình mềm mại.',
    featured: true,
  },
  {
    id: 103,
    categoryId: 2,
    name: 'Dâu Ngọt Dịu Dàng',
    slug: 'dau-ngot-diu-dang',
    sku: 'NX-BD-001',
    price: 430000,
    salePrice: 389000,
    imageUrl: '/images/product-dau-ngot.jpg',
    description: 'Hoa hồng dâu phối cát tường trắng, hợp sinh nhật và kỷ niệm.',
    featured: true,
  },
  {
    id: 104,
    categoryId: 2,
    name: 'Muse Cẩm Tú Cầu',
    slug: 'muse-cam-tu-cau',
    sku: 'NX-BD-002',
    price: 520000,
    salePrice: 479000,
    imageUrl: '/images/product-cam-tu-cau.jpg',
    description: 'Cẩm tú cầu xanh nhạt, hồng kem và lá bạc, thanh lịch và tươi trẻ.',
    featured: true,
  },
  {
    id: 105,
    categoryId: 3,
    name: 'Rực Rỡ Khởi Đầu',
    slug: 'ruc-ro-khoi-dau',
    sku: 'NX-KT-001',
    price: 950000,
    salePrice: 890000,
    imageUrl: '/images/product-opening.jpg',
    description: 'Giỏ hoa khai trương tone cam vàng, phối lan và đồng tiền.',
    featured: false,
  },
  {
    id: 106,
    categoryId: 4,
    name: 'Custom Pastel Mood',
    slug: 'custom-pastel-mood',
    sku: 'NX-CS-001',
    price: 600000,
    salePrice: null,
    imageUrl: '/images/product-custom.jpg',
    description: 'Thiết kế theo ngân sách và tone màu yêu thích, tư vấn mẫu trước khi bó.',
    featured: false,
  },
]

const withDisplayImage = (item) => ({
  ...item,
  imageUrl: toDisplayImageUrl(item.imageUrl),
})

export const categories = categoryData.map(withDisplayImage)
export const products = productData.map(withDisplayImage)
