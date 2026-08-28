import { FlowerProduct, OccasionCategory, ReviewItem } from '../types';

export const OCCASIONS: OccasionCategory[] = [
  {
    id: 'birthday',
    title: 'Birthday',
    vietnameseTitle: 'Hoa Sinh Nhật',
    subtitle: 'Rực rỡ & ngập tràn niềm vui',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop', // Striped tulips matching screenshot
    badge: 'Phổ biến nhất',
    flowerCount: 24,
  },
  {
    id: 'grand_opening',
    title: 'Grand Opening',
    vietnameseTitle: 'Khai Trương Hồng Phát',
    subtitle: 'Thịnh vượng & phát tài',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop', // Golden poppies / bright yellow flowers
    badge: 'Mang lại tài lộc',
    flowerCount: 18,
  },
  {
    id: 'graduation',
    title: 'Graduation',
    vietnameseTitle: 'Lễ Tốt Nghiệp',
    subtitle: 'Tương lai tươi sáng & tự hào',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', // Delicate pink lily against soft minimal background
    badge: 'Ý nghĩa sâu sắc',
    flowerCount: 15,
  },
  {
    id: 'custom',
    title: 'Custom Design',
    vietnameseTitle: 'Thiết Kế Độc Quyền',
    subtitle: 'Cá nhân hoá theo yêu cầu',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop', // Deep velvet red roses
    badge: 'Nghệ nhân Nana Xinh',
    flowerCount: 30,
  },
  {
    id: 'romantic',
    title: 'Romantic Love',
    vietnameseTitle: 'Tỏ Tình & Kỷ Niệm',
    subtitle: 'Ngọt ngào & say đắm',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    badge: 'Bán chạy nhất',
    flowerCount: 20,
  },
];

export const PRODUCTS: FlowerProduct[] = [
  {
    id: 'cam-tu-cau',
    name: 'Cẩm Tú Cầu',
    subtitle: 'Hydrangea mix',
    vietnameseTitle: 'Bó Hoa Cẩm Tú Cầu Mix Pastel',
    category: 'romantic',
    price: 550000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop', // Heart floral arrangement held in hands matching screenshot
    gallery: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Best Seller', 'Tình Yêu', 'Hydrangea'],
    description: 'Bó hoa kết hợp cẩm tú cầu Đà Lạt nhập tuyển chọn cùng các loại hoa hồng phấn, hoa baby trắng tinh khôi mang lại cảm giác dịu êm, lãng mạn.',
    meaning: 'Tượng trưng cho sự biết ơn, thấu hiểu và tình cảm chân thành từ tận đáy lòng.',
    careInstructions: [
      'Cắt vát gốc 45 độ trước khi cắm vào bình nước mát.',
      'Phun sương nhẹ lên cánh hoa cẩm tú cầu mỗi ngày.',
      'Tránh ánh nắng trực tiếp và luồng gió quạt hoặc máy lạnh mạnh.',
      'Thay nước mới mỗi 1-2 ngày kèm gói dưỡng hoa tặng kèm.',
    ],
    flowerTypes: ['Cẩm Tú Cầu', 'Hoa Hồng Pastel', 'Baby Breath', 'Lá Khuynh Diệp'],
    colorTheme: 'Hồng Pastel & Trắng Kem',
    isSignature: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'dau-ngot',
    name: 'Dâu Ngọt',
    subtitle: 'Pink roses & carnations',
    vietnameseTitle: 'Bó Hoa Dâu Ngọt Dịu Dàng',
    category: 'birthday',
    price: 620000,
    originalPrice: 720000,
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop', // Pink tulips & carnations matching screenshot
    gallery: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Ngọt Ngào', 'Sinh Nhật', 'Phụ Nữ'],
    description: 'Sự phối hợp tinh tế giữa hoa hồng kem dâu, hoa cẩm chướng viền hồng và những nụ hoa tươi tắn tạo nên tổng thể thơ mộng như một ly trà dâu ngọt lành.',
    meaning: 'Biểu trưng cho vẻ đẹp dịu dàng, nữ tính và lời chúc luôn vui tươi, trẻ trung.',
    careInstructions: [
      'Giữ hoa ở nơi thoáng mát nhiệt độ từ 20-25 độ C.',
      'Tỉa bỏ bớt lá dưới mực nước để tránh thối nước.',
      'Thêm nước sạch hằng ngày vào xốp cắm hoa.',
    ],
    flowerTypes: ['Hoa Hồng Dâu', 'Hoa Cẩm Chướng Hồng', 'Cát Tường Kem', 'Hoa Thanh Liễu'],
    colorTheme: 'Hồng Dâu & Xanh Mạ',
    isSignature: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'baby-pink',
    name: 'Baby Pink',
    subtitle: "Tulips & baby's breath",
    vietnameseTitle: 'Bó Hoa Baby Pink Tươi Rực Rỡ',
    category: 'graduation',
    price: 750000,
    originalPrice: 850000,
    rating: 4.8,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=800&auto=format&fit=crop', // Red/pink fresh floral bouquet matching screenshot
    gallery: [
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Tốt Nghiệp', 'Kiêu Sa', 'Tulip'],
    description: 'Bó hoa được kết đan xen giữa hoa tulip Hà Lan nhập khẩu cao cấp và đám mây baby trắng bồng bềnh, gói giấy lụa phong cách Hàn Quốc thanh tao.',
    meaning: 'Lời chúc thành công rạng rỡ, niềm tin và những khởi đầu mới đầy hy vọng.',
    careInstructions: [
      'Tulip ưa nước lạnh, bạn có thể thả thêm 1-2 viên đá lạnh vào bình.',
      'Tránh để hoa dưới quạt trần quay mạnh.',
    ],
    flowerTypes: ['Hoa Tulip Hồng Đỏ', 'Baby Hà Lan', 'Lá Đô La'],
    colorTheme: 'Hồng Đỏ & Trắng Tinh',
    isSignature: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 'sunshine',
    name: 'Sunshine',
    subtitle: 'Sunflowers & daisies',
    vietnameseTitle: 'Bó Hoa Nắng Mai & Cúc Hoạ Mi',
    category: 'grand_opening',
    price: 480000,
    originalPrice: 550000,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', // Rainbow vibrant roses & bright flowers matching screenshot
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Năng Lượng', 'Khai Trương', 'Chúc Mừng'],
    description: 'Năng lượng bừng sáng từ những bông hoa rực rỡ sắc màu, mang nụ cười ấm áp và sự lạc quan truyền cảm hứng đến người nhận.',
    meaning: 'Tượng trưng cho sự kiên định, nguồn năng lượng tích cực và may mắn thăng hoa.',
    careInstructions: [
      'Hoa hướng dương và cúc bền tự nhiên từ 5-7 ngày.',
      'Cắt xén gốc 2cm sau mỗi 2 ngày để hoa hút nước tốt.',
    ],
    flowerTypes: ['Hoa Hướng Dương', 'Cúc Tana', 'Hoa Hồng Vàng', 'Hoa Nhím Biển'],
    colorTheme: 'Vàng Rực Rỡ & Đa Sắc',
    isSignature: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'tinh-nong',
    name: 'Tình Nồng',
    subtitle: 'Red velvet Ecuador roses',
    vietnameseTitle: 'Bó Hoa Hồng Đỏ Nhung Ecuador',
    category: 'romantic',
    price: 890000,
    originalPrice: 990000,
    rating: 5.0,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Luxury', 'Valentine', 'Hoa Hồng'],
    description: 'Những đóa hồng nhung đỏ thắm size đại nhập khẩu trực tiếp từ Ecuador, cánh dày dặn và hương thơm quý phái mê hoặc.',
    meaning: 'Tình yêu nồng cháy, bất diệt và duy nhất dành cho người đặc biệt.',
    careInstructions: [
      'Cắt gốc hoa chéo góc để diện tích hút nước lớn nhất.',
      'Dùng kèm nước dưỡng hoa chuyên dụng được gửi kèm.',
    ],
    flowerTypes: ['Hồng Ecuador Đỏ Nhung', 'Lá Bạc Nhập Khẩu', 'Hoa Phụ Tím'],
    colorTheme: 'Đỏ Nhung Hoàng Gia',
    isSignature: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'binh-minh-thanh-khiet',
    name: 'Bình Minh',
    subtitle: 'White peonies & eucalyptus',
    vietnameseTitle: 'Bó Hoa Mẫu Đơn & Khuynh Diệp',
    category: 'custom',
    price: 980000,
    originalPrice: 1100000,
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Quý Phái', 'Mẫu Đơn', 'Sang Trọng'],
    description: 'Hoa mẫu đơn trắng thanh tao kết hợp lá khuynh diệp thơm dịu, tạo nên sự trang nhã quý phái đậm chất Parisian.',
    meaning: 'Sự vương giả, phú quý và hạnh phúc viên mãn tròn đầy.',
    careInstructions: [
      'Mẫu đơn nở bung tuyệt đẹp khi cắm trong nước sạch mát.',
      'Tránh sờ tay nhiều lên tâm hoa.',
    ],
    flowerTypes: ['Mẫu Đơn Trắng', 'Hồng Trắng Cồ', 'Lá Bạc'],
    colorTheme: 'Trắng Ngà & Xanh Bạc',
    isSignature: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 'khai-truong-hong-phat',
    name: 'Hồng Phát Đại Lợi',
    subtitle: 'Grand opening floral box',
    vietnameseTitle: 'Hộp Hoa Khai Trương Thịnh Vượng',
    category: 'grand_opening',
    price: 1250000,
    originalPrice: 1400000,
    rating: 5.0,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Khai Trương', 'Kệ Hoa', 'Phát Tài'],
    description: 'Kệ hoa thiết kế hiện đại sang trọng với lan hồ điệp vàng kim, hoa hồng cam lửa và thiên điểu kiêu hãnh.',
    meaning: 'Mở cửa rước lộc, kinh doanh thuận buồm xuôi gió, tiền vào như nước.',
    careInstructions: [
      'Đã bao gồm bình xốp giữ ẩm tiện lợi.',
      'Châm thêm 200ml nước mỗi sáng vào giữa khay hoa.',
    ],
    flowerTypes: ['Lan Hồ Điệp Vàng', 'Hồng Cam Spirit', 'Thiên Điểu', 'Lan Vũ Nữ'],
    colorTheme: 'Cam Lửa & Vàng Hoàng Kim',
    isSignature: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'giac-mo-tim',
    name: 'Giấc Mơ Tím',
    subtitle: 'Lavender & eustoma',
    vietnameseTitle: 'Bó Hoa Cát Tường Tím Thơ Mộng',
    category: 'anniversary',
    price: 580000,
    originalPrice: 660000,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    ],
    tags: ['Thuỷ Chung', 'Kỷ Niệm', 'Lavender'],
    description: 'Tone tím mộng mơ với hoa cát tường mềm mại phối cùng nhánh oải hương Pháp thơm ngát quyến rũ.',
    meaning: 'Biểu tượng của sự gắn kết son sắt, bình yên và chung thủy theo năm tháng.',
    careInstructions: [
      'Cắt gốc xéo và chưng nơi tránh gió lùa.',
    ],
    flowerTypes: ['Cát Tường Tím', 'Lavender Khô', 'Hồng Tím Cổ', 'Sao Tím'],
    colorTheme: 'Tím Khói & Xanh Biếc',
    isSignature: false,
    isBestSeller: false,
    inStock: true,
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Minh Anh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'Hôm qua',
    comment: 'Bó hoa Cẩm Tú Cầu bên ngoài đẹp hơn cả ảnh chụp! Bạn florist viết thiệp nắn nót rất có tâm, giao hoa đến bạn gái mình thích mê. Chắc chắn sẽ quay lại ủng hộ Nana Xinh!',
    productName: 'Cẩm Tú Cầu Mix',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Trần Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '3 ngày trước',
    comment: 'Giao siêu nhanh chỉ trong 1h30 phút. Hoa tươi rói, cành lá cứng cáp, giấy gói cao cấp chuẩn gu Hàn Quốc. Rất hài lòng.',
    productName: 'Tình Nồng Ecuador',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Thu Thảo',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '1 tuần trước',
    comment: 'Tính năng gợi ý lời chúc thiệp thông minh quá, mình không còn phải nghĩ xem viết gì vào thiệp sinh nhật sếp. 10 điểm cho sự chu đáo!',
    productName: 'Sunshine Daisies',
    verified: true,
  }
];

export const PRESET_GREETINGS = [
  {
    category: 'Sinh nhật người yêu / Vợ',
    messages: [
      'Chúc em yêu tuổi mới luôn xinh đẹp, rạng rỡ như những đóa hoa này và luôn hạnh phúc bên anh nhé!',
      'Gửi người con gái anh yêu món quà ngọt ngào nhất. Chúc mừng sinh nhật em!',
      'Cảm ơn em đã đến và mang lại muôn vàn sắc màu tươi đẹp cho cuộc đời anh. Yêu em rất nhiều!'
    ]
  },
  {
    category: 'Chúc mừng Khai Trương',
    messages: [
      'Kính chúc quý công ty / cửa hàng khai trương hồng phát, làm ăn phát đạt, tiền vào như nước!',
      'Mở cửa đón tài lộc, kinh doanh thuận buồm xuôi gió, vạn sự hanh thông!',
      'Chúc cửa hàng luôn tấp nập khách hàng, mở rộng quy mô ngày càng rực rỡ!'
    ]
  },
  {
    category: 'Kỷ niệm ngày cưới / Ngày yêu',
    messages: [
      'Cảm ơn em vì đã đồng hành cùng anh qua mọi khoảnh khắc. Chúc mừng kỷ niệm của chúng ta!',
      'Tình yêu của chúng ta sẽ luôn tươi mới và bền chặt như những đóa hoa này.',
    ]
  },
  {
    category: 'Tốt nghiệp & Thành công',
    messages: [
      'Chúc mừng tân cử nhân! Chúc bạn vững bước trên con đường tương lai và gặt hái thật nhiều thành công mới!',
      'Tự hào về bạn rất nhiều. Hãy luôn tự tin tỏa sáng rực rỡ nhé!',
    ]
  },
  {
    category: 'Tặng Mẹ / Gia đình',
    messages: [
      'Chúc Mẹ kính yêu của con luôn mạnh khỏe, an vui và mãi là điểm tựa ấm áp nhất của gia đình!',
      'Con yêu Mẹ nhiều lắm! Cảm ơn Mẹ đã luôn hy sinh và chở che cho chúng con.',
    ]
  }
];
