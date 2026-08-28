import React from 'react';
import { X, Home, Store, Sparkles, Heart, HelpCircle, Phone, BookOpen, MapPin, ChevronRight, Flower2 } from 'lucide-react';
import { OCCASIONS } from '../data/flowerData';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  onNavigateShop: (category?: string) => void;
  onOpenCustomStudio: () => void;
  onOpenAiFlorist: () => void;
  onOpenWishlist: () => void;
  onOpenCareGuide: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateShop,
  onOpenCustomStudio,
  onOpenAiFlorist,
  onOpenWishlist,
  onOpenCareGuide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-start animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-xs h-full shadow-2xl flex flex-col border-r border-[#fce7e7]">
        
        {/* Top Header */}
        <div className="p-5 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] border border-[#ddbfc1] flex items-center justify-center text-[#a6354c]">
              <Flower2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#1f1a1e] block">
                Nana Xinh
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8a7173] font-semibold">
                Atelier Floral
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          
          {/* Main navigation */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigateHome();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1f1a1e] hover:bg-[#fdf2f2] hover:text-[#a6354c] font-semibold transition"
            >
              <Home className="w-4 h-4 text-[#a6354c]" />
              <span>Trang Chủ</span>
            </button>

            <button
              onClick={() => {
                onNavigateShop('all');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1f1a1e] hover:bg-[#fdf2f2] hover:text-[#a6354c] font-semibold transition"
            >
              <Store className="w-4 h-4 text-[#a6354c]" />
              <span>Tất Cả Mẫu Hoa</span>
            </button>

            <button
              onClick={() => {
                onOpenCustomStudio();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1f1a1e] hover:bg-[#fdf2f2] hover:text-[#a6354c] font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-[#ee6c81]" />
              <span>Thiết Kế Hoa Riêng</span>
            </button>

            <button
              onClick={() => {
                onOpenAiFlorist();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1f1a1e] hover:bg-[#fdf2f2] hover:text-[#a6354c] font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-[#a6354c]" />
              <span>AI Tư Vấn Lời Chúc</span>
            </button>

            <button
              onClick={() => {
                onOpenWishlist();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1f1a1e] hover:bg-[#fdf2f2] hover:text-[#a6354c] font-semibold transition"
            >
              <Heart className="w-4 h-4 text-[#a6354c]" />
              <span>Mẫu Hoa Đã Lưu</span>
            </button>
          </div>

          {/* Occasion Categories */}
          <div className="pt-2 border-t border-[#f6ebf0] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7173] px-3 block mb-1">
              Dịp Tặng Hoa
            </span>
            {OCCASIONS.map((occ) => (
              <button
                key={occ.id}
                onClick={() => {
                  onNavigateShop(occ.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#564143] hover:bg-[#fdf2f2] hover:text-[#a6354c] transition"
              >
                <span>{occ.title} ({occ.vietnameseTitle})</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
          </div>

          {/* Handbook & Care Guide */}
          <div className="pt-2 border-t border-[#f6ebf0] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7173] px-3 block mb-1">
              Hỗ Trợ & Cẩm Nang
            </span>
            <button
              onClick={() => {
                onOpenCareGuide();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#564143] hover:bg-[#fdf2f2] hover:text-[#a6354c] transition"
            >
              <BookOpen className="w-4 h-4 text-[#8a7173]" />
              <span>Bí quyết giữ hoa tươi 7 ngày</span>
            </button>
            <a
              href="tel:0908123456"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#564143] hover:bg-[#fdf2f2] hover:text-[#a6354c] transition"
            >
              <Phone className="w-4 h-4 text-[#8a7173]" />
              <span>Hotline: 0908 120 202</span>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#f6ebf0] text-[11px] text-[#8a7173] text-center">
          <p>© 2026 Nana Xinh Boutique</p>
          <p className="text-[10px] mt-0.5">Trao gửi yêu thương qua từng cánh hoa</p>
        </div>

      </div>
    </div>
  );
};
