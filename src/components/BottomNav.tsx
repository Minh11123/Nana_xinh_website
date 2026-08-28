import React from 'react';
import { Home, Store, ShoppingBag, MessageSquareText } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'shop' | 'cart' | 'zalo';
  cartCount: number;
  onTabChange: (tab: 'home' | 'shop' | 'cart' | 'zalo') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  cartCount,
  onTabChange,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#f6ebf0] shadow-lg max-w-2xl mx-auto rounded-t-3xl sm:rounded-b-none px-4 py-2">
      <div className="flex items-center justify-around">
        {/* Home Tab */}
        <button
          id="tab-nav-home"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === 'home'
              ? 'text-[#a6354c] font-bold'
              : 'text-[#564143] hover:text-[#a6354c]'
          }`}
        >
          <Home className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[11px] mt-1">Home</span>
        </button>

        {/* Shop Tab */}
        <button
          id="tab-nav-shop"
          onClick={() => onTabChange('shop')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === 'shop'
              ? 'text-[#a6354c] font-bold'
              : 'text-[#564143] hover:text-[#a6354c]'
          }`}
        >
          <Store className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[11px] mt-1">Shop</span>
        </button>

        {/* Cart Tab with Highlight Pill */}
        <button
          id="tab-nav-cart"
          onClick={() => onTabChange('cart')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 ${
            activeTab === 'cart'
              ? 'bg-[#fdf2f2] text-[#a6354c] font-bold border border-[#fce7e7]'
              : 'bg-[#fcf1f6]/60 text-[#a6354c] font-semibold hover:bg-[#fdf2f2]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2] text-[#a6354c]" />
          </div>
          <span className="text-[11px] mt-0.5 font-bold">
            Giỏ ({cartCount})
          </span>
        </button>

        {/* Zalo / Chat consultation Tab */}
        <button
          id="tab-nav-zalo"
          onClick={() => onTabChange('zalo')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === 'zalo'
              ? 'text-[#a6354c] font-bold'
              : 'text-[#564143] hover:text-[#a6354c]'
          }`}
        >
          <MessageSquareText className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[11px] mt-1">Zalo</span>
        </button>
      </div>
    </nav>
  );
};
