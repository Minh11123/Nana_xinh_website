import React from 'react';
import { Menu, ShoppingBag, Heart, Search, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  activeNav?: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenAiFlorist: () => void;
  onNavigateHome: () => void;
  onNavigateShop: (category?: string) => void;
  onOpenOurStory: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  activeNav = 'home',
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  onOpenMenu,
  onOpenSearch,
  onOpenAiFlorist,
  onNavigateHome,
  onNavigateShop,
  onOpenOurStory,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fff7f9]/95 backdrop-blur-md border-b border-[#fce7e7] transition-all">
      {/* Top micro banner for promotions */}
      <div className="bg-[#a6354c] text-white text-[11px] font-medium tracking-wide py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#ffb2ba]" />
        <span>Giao hoa hỏa tốc trong 2h · Miễn phí thiệp viết tay & nước dưỡng hoa cao cấp</span>
        <button 
          onClick={onOpenAiFlorist}
          className="hidden sm:inline-flex underline underline-offset-2 font-semibold hover:text-[#ffb2ba] transition-colors ml-2"
        >
          Gợi ý quà tặng AI
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left / Brand Logo "Nana Xinh" */}
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button
            id="btn-header-menu"
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-full flex md:hidden items-center justify-center text-[#1f1a1e] hover:bg-[#fcf1f6] active:scale-95 transition"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            id="btn-header-logo"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#fdf2f2] border border-[#ddbfc1] flex items-center justify-center text-[#a6354c] shadow-xs group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#a6354c]">
                <path d="M12 2C12 2 8 6 8 10C8 13.5 10.5 16 12 21C13.5 16 16 13.5 16 10C16 6 12 2 12 2Z" />
                <path d="M6 10C6 10 9 9 12 12C15 9 18 10 18 10" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#a6354c] group-hover:text-[#861d36] transition-colors">
                Nana Xinh
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Links (Home, All Flowers, Occasions, Our Story, Contact) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs sm:text-sm font-medium">
          <button
            onClick={onNavigateHome}
            className={`transition-colors relative py-1 ${
              activeNav === 'home'
                ? 'text-[#a6354c] font-bold border-b-2 border-[#a6354c]'
                : 'text-[#564143] hover:text-[#a6354c]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigateShop('all')}
            className={`transition-colors relative py-1 ${
              activeNav === 'shop'
                ? 'text-[#a6354c] font-bold border-b-2 border-[#a6354c]'
                : 'text-[#564143] hover:text-[#a6354c]'
            }`}
          >
            All Flowers
          </button>

          <button
            onClick={() => onNavigateShop('birthday')}
            className="text-[#564143] hover:text-[#a6354c] transition-colors relative py-1"
          >
            Occasions
          </button>

          <button
            onClick={onOpenOurStory}
            className="text-[#564143] hover:text-[#a6354c] transition-colors relative py-1"
          >
            Our Story
          </button>

          <button
            onClick={onOpenContact}
            className="text-[#564143] hover:text-[#a6354c] transition-colors relative py-1"
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Search, Wishlist, Cart & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Advisor button (Desktop) */}
          <button
            id="btn-header-ai-advisor"
            onClick={onOpenAiFlorist}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdf2f2] text-[#a6354c] text-xs font-semibold hover:bg-[#ffb2ba]/30 border border-[#fce7e7] transition shadow-xs mr-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ee6c81]" />
            <span>Tư vấn AI</span>
          </button>

          {/* Search Icon */}
          <button
            id="btn-header-search-icon"
            onClick={onOpenSearch}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#564143] hover:bg-[#fcf1f6] hover:text-[#a6354c] active:scale-95 transition"
            aria-label="Tìm kiếm hoa"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist */}
          <button
            id="btn-header-wishlist"
            onClick={onOpenWishlist}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#564143] hover:bg-[#fcf1f6] hover:text-[#a6354c] active:scale-95 transition"
            aria-label="Danh sách yêu thích"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ee6c81] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag with circular red badge */}
          <button
            id="btn-header-cart"
            onClick={onOpenCart}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#1f1a1e] hover:bg-[#fcf1f6] active:scale-95 transition"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#a6354c] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Circle Avatar (Deep Burgundy matching screenshot) */}
          <button
            id="btn-header-profile"
            onClick={onOpenProfile}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#a6354c] text-white flex items-center justify-center shadow-xs hover:bg-[#861d36] transition active:scale-95 ml-1"
            aria-label="Tài khoản cá nhân"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
