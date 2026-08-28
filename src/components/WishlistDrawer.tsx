import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { FlowerProduct } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: FlowerProduct[];
  onRemoveFromWishlist: (product: FlowerProduct) => void;
  onQuickAddToCart: (product: FlowerProduct) => void;
  onSelectProduct: (product: FlowerProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onQuickAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#fce7e7]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c]">
              <Heart className="w-4 h-4 fill-[#a6354c]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">
                Mẫu Hoa Yêu Thích
              </h2>
              <span className="text-[11px] text-[#8a7173]">
                {wishlistProducts.length} sản phẩm đã lưu
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c] mb-3">
              <Heart className="w-8 h-8 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1f1a1e]">
              Chưa có mẫu hoa nào được lưu
            </h3>
            <p className="text-xs text-[#8a7173] max-w-xs mt-1 leading-relaxed">
              Nhấn vào biểu tượng trái tim ở bất kỳ mẫu hoa nào để lưu lại và dễ dàng tìm lại nhé!
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-2xl border border-[#f6ebf0] shadow-2xs flex gap-3 items-center justify-between"
              >
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#fdf2f2]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1f1a1e] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#8a7173] truncate">
                      {product.subtitle}
                    </p>
                    <span className="font-bold text-xs text-[#a6354c] block mt-0.5">
                      {formatVND(product.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onQuickAddToCart(product)}
                    className="p-2 bg-[#a6354c] hover:bg-[#861d36] text-white rounded-xl shadow-xs transition"
                    title="Thêm vào giỏ"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-[#8a7173] hover:text-[#ba1a1a] hover:bg-[#fcf1f6] rounded-xl transition"
                    title="Bỏ yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
