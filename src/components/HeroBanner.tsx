import React, { useState } from 'react';
import { ArrowRight, Sparkles, Heart, MessageCircle, Send, Bookmark, ChevronLeft, MoreHorizontal, ShoppingBag } from 'lucide-react';

interface HeroBannerProps {
  onShopCollection: () => void;
  onOpenStoryModal?: () => void;
  onOccasionClick: (category: string) => void;
  isDesktopOnly?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopCollection,
  onOpenStoryModal,
  onOccasionClick,
  isDesktopOnly = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(692);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Desktop Hero Section - Exact Match to Screenshot */}
      <section className="relative w-full bg-gradient-to-r from-[#fff7f9] via-[#fef2f5] to-[#fcebee] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6 text-left z-10">
              
              {/* Category eyebrow tag */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#a6354c]">
                  MODERN FLORIST
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f1a1e] tracking-tight leading-[1.18]">
                Trao gửi yêu thương <br className="hidden sm:inline" />
                qua từng cánh hoa
              </h1>

              {/* Subtitle / Philosophy */}
              <p className="text-xs sm:text-sm lg:text-base text-[#564143] leading-relaxed max-w-lg">
                Curating delicate moments through the language of flowers. Sophistication in every petal, delivered fresh to your door.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id="btn-desktop-hero-shop"
                  onClick={onShopCollection}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Image Column (7 cols on lg) - Peonies & Roses in Ceramic Vase */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-white/60">
                <img
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1400&auto=format&fit=crop"
                  alt="Lush peonies and roses arrangement"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                
                {/* Soft ambient gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />

                {/* Floating pill badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-[#fce7e7] hidden sm:flex items-center gap-1.5 text-xs text-[#1f1a1e] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#a6354c]" />
                  <span>Bộ Sưu Tập Mùa Hoa 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Share toast notification */}
      {showShareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#1f1a1e] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50 animate-fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ee6c81]" />
          <span>Đã sao chép liên kết bộ sưu tập hoa!</span>
        </div>
      )}
    </div>
  );
};
