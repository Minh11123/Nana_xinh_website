import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Plus, Sparkles, Filter, X } from 'lucide-react';
import { FlowerProduct } from '../types';
import { OCCASIONS } from '../data/flowerData';

interface ShopCatalogScreenProps {
  products: FlowerProduct[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: FlowerProduct) => void;
  onQuickAddToCart: (product: FlowerProduct) => void;
  onSelectProduct: (product: FlowerProduct) => void;
  onOpenCustomStudio: () => void;
}

export const ShopCatalogScreen: React.FC<ShopCatalogScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToCart,
  onSelectProduct,
  onOpenCustomStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlowerType, setSelectedFlowerType] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(1500000);

  const flowerTypes = ['Tất cả', 'Cẩm Tú Cầu', 'Hoa Hồng', 'Tulip', 'Mẫu Đơn', 'Hướng Dương', 'Lavender'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSub = item.subtitle.toLowerCase().includes(q);
        const matchTitle = item.vietnameseTitle.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchTitle && !matchDesc) return false;
      }
      // Flower type
      if (selectedFlowerType !== 'all') {
        const hasFlower = item.flowerTypes.some((f) =>
          f.toLowerCase().includes(selectedFlowerType.toLowerCase())
        );
        if (!hasFlower) return false;
      }
      // Max price
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedFlowerType, maxPrice, priceSort]);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#fdf2f2] via-[#fff7f9] to-[#fcebee] p-6 sm:p-8 rounded-3xl border border-[#fce7e7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#a6354c] bg-white px-3 py-1 rounded-full border border-[#ddbfc1]">
            Cửa hàng Nana Xinh
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1a1e] mt-2">
            Bộ Sưu Tập Hoa Tươi Nghệ Thuật
          </h1>
          <p className="text-xs sm:text-sm text-[#564143] mt-1">
            Khám phá {filteredProducts.length} tác phẩm hoa tươi tuyển chọn mỗi ngày
          </p>
        </div>

        <button
          onClick={onOpenCustomStudio}
          className="px-5 py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition active:scale-95 shrink-0 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Thiết Kế Hoa Riêng</span>
        </button>
      </div>

      {/* Search & Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8a7173] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm hoa theo tên, dịp tặng (VD: sinh nhật, tulip, hồng đỏ...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white text-xs sm:text-sm text-[#1f1a1e] rounded-xl border border-[#f6ebf0] focus:outline-none focus:border-[#a6354c] shadow-2xs placeholder:text-[#8a7173]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7173] hover:text-[#1f1a1e]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value as any)}
          aria-label="Sắp xếp theo giá"
          className="text-xs sm:text-sm font-semibold text-[#564143] bg-white border border-[#f6ebf0] rounded-xl px-3 py-2.5 shrink-0 focus:outline-none"
        >
          <option value="default">Sắp xếp: Phổ biến nhất</option>
          <option value="asc">Giá: Thấp đến Cao</option>
          <option value="desc">Giá: Cao đến Thấp</option>
        </select>
      </div>

      {/* Category Tabs (Horizontally scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
            selectedCategory === 'all'
              ? 'bg-[#a6354c] text-white shadow-xs'
              : 'bg-white text-[#564143] border border-[#f6ebf0] hover:border-[#ddbfc1]'
          }`}
        >
          Tất cả hoa
        </button>
        {OCCASIONS.map((occ) => (
          <button
            key={occ.id}
            onClick={() => onSelectCategory(occ.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              selectedCategory === occ.id
                ? 'bg-[#a6354c] text-white shadow-xs'
                : 'bg-white text-[#564143] border border-[#f6ebf0] hover:border-[#ddbfc1]'
            }`}
          >
            {occ.title} ({occ.vietnameseTitle})
          </button>
        ))}
      </div>

      {/* Flower Type Quick Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs text-[#8a7173] font-medium shrink-0">Loại hoa:</span>
        {flowerTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedFlowerType(type === 'Tất cả' ? 'all' : type)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              (selectedFlowerType === 'all' && type === 'Tất cả') || selectedFlowerType === type
                ? 'bg-[#fdf2f2] text-[#a6354c] font-bold border border-[#ddbfc1]'
                : 'bg-white text-[#8a7173] border border-[#f6ebf0] hover:text-[#1f1a1e]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Product List / Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
          <p className="text-base font-semibold text-[#1f1a1e]">
            Không tìm thấy mẫu hoa phù hợp
          </p>
          <p className="text-xs sm:text-sm text-[#8a7173] max-w-md mx-auto">
            Hãy thử tìm kiếm với từ khóa khác hoặc liên hệ Nana Xinh để thiết kế hoa theo yêu cầu!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
              setSelectedFlowerType('all');
            }}
            className="mt-2 px-4 py-2 bg-[#a6354c] text-white rounded-xl text-xs font-bold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isFavorited = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#f6ebf0] shadow-2xs hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square w-full overflow-hidden bg-[#fdf2f2] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1f1a1e] hover:bg-white active:scale-90 transition shadow-xs z-10"
                    aria-label="Thêm vào yêu thích"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorited
                          ? 'fill-[#a6354c] text-[#a6354c]'
                          : 'text-[#564143] hover:text-[#a6354c]'
                      }`}
                    />
                  </button>

                  {product.isBestSeller && (
                    <span className="absolute top-2.5 left-2.5 bg-[#a6354c] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      Hot
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                  <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                    <h3 className="font-bold text-sm sm:text-base text-[#1f1a1e] leading-snug group-hover:text-[#a6354c] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8a7173] font-normal mt-0.5 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#fcf1f6]">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm sm:text-base text-[#1f1a1e]">
                        {formatVND(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-[#8a7173] line-through">
                          {formatVND(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onQuickAddToCart(product)}
                      className="w-8 h-8 rounded-lg bg-[#a6354c] hover:bg-[#861d36] active:scale-90 text-white flex items-center justify-center shadow-xs transition cursor-pointer"
                      aria-label={`Thêm ${product.name}`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
