import React from 'react';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { FlowerProduct } from '../types';

interface SignatureBouquetsProps {
  products: FlowerProduct[];
  wishlistIds: string[];
  onToggleWishlist: (product: FlowerProduct) => void;
  onQuickAddToCart: (product: FlowerProduct) => void;
  onSelectProduct: (product: FlowerProduct) => void;
  onViewAllCatalog: () => void;
}

export const SignatureBouquets: React.FC<SignatureBouquetsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAddToCart,
  onSelectProduct,
  onViewAllCatalog,
}) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  // 4 display products matching screenshot order: Cẩm Tú Cầu, Dâu Ngọt, Baby Pink, Sunshine
  const displayProducts = products.slice(0, 4);

  return (
    <section className="w-full bg-[#fdf2f5] py-14 sm:py-18 border-y border-[#f6ebf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left Title and Right View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f1a1e] tracking-tight">
              Signature Bouquets
            </h2>
            <p className="text-xs sm:text-sm text-[#564143] mt-1 font-normal">
              Our most loved arrangements.
            </p>
          </div>
          <button
            onClick={onViewAllCatalog}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#a6354c] hover:text-[#861d36] group transition"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Product Cards Grid (Matching Screenshot) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product, index) => {
            const isFavorited = wishlistIds.includes(product.id);
            // First item BESTSELLER, 3rd item NEW per screenshot
            const tag = index === 0 ? 'BESTSELLER' : index === 2 ? 'NEW' : null;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#f6ebf0] shadow-xs hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square w-full overflow-hidden bg-[#fdf2f2] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badge: BESTSELLER or NEW */}
                  {tag && (
                    <span className="absolute top-3 left-3 bg-[#a6354c] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs">
                      {tag}
                    </span>
                  )}

                  {/* Heart Wishlist Toggle */}
                  <button
                    id={`btn-wishlist-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1f1a1e] hover:bg-white active:scale-90 transition shadow-xs z-10"
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
                </div>

                {/* Product Meta */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-center sm:text-left">
                  <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1f1a1e] leading-snug group-hover:text-[#a6354c] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#1f1a1e] mt-1">
                      {formatVND(product.price)}
                    </p>
                  </div>

                  {/* Add to Cart Button with Shopping Bag icon */}
                  <div className="mt-4 pt-2">
                    <button
                      id={`btn-desktop-add-cart-${product.id}`}
                      onClick={() => onQuickAddToCart(product)}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#a6354c] hover:text-white text-[#1f1a1e] border border-[#ddbfc1] hover:border-[#a6354c] text-xs font-semibold rounded-lg shadow-2xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
