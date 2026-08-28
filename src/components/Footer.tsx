import React, { useState } from 'react';
import { Share2, Instagram, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onOpenOurStory: () => void;
  onOpenContact: () => void;
  onOpenCareGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateShop,
  onOpenOurStory,
  onOpenContact,
  onOpenCareGuide,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="w-full bg-[#fdf2f5] border-t border-[#f6ebf0] pt-12 pb-8 text-[#564143]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <h3 
              onClick={onNavigateHome}
              className="font-serif text-xl font-bold text-[#a6354c] cursor-pointer hover:opacity-90 transition"
            >
              Nana Xinh
            </h3>
            <p className="text-xs text-[#564143] leading-relaxed max-w-xs">
              Modern florist curating delicate moments through the language of flowers. Sophistication in every petal.
            </p>
          </div>

          {/* Col 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1f1a1e]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={onNavigateShop} 
                  className="text-[#564143] hover:text-[#a6354c] transition"
                >
                  All Flowers
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenOurStory} 
                  className="text-[#564143] hover:text-[#a6354c] transition"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenCareGuide} 
                  className="text-[#564143] hover:text-[#a6354c] transition"
                >
                  Shipping Info & Care
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact} 
                  className="text-[#564143] hover:text-[#a6354c] transition"
                >
                  Contact & Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: NEWSLETTER */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1f1a1e]">
              NEWSLETTER
            </h4>
            <p className="text-xs text-[#564143]">
              Join our bloom club for updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold py-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cảm ơn bạn đã đăng ký nhận tin!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5 items-center">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#ddbfc1] rounded-md focus:outline-none focus:border-[#a6354c] text-[#1f1a1e] placeholder-[#8a7173] w-full max-w-[180px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-semibold rounded-md shadow-xs transition"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          {/* Col 4: FOLLOW US */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1f1a1e]">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-3 text-[#a6354c]">
              <a
                href="#share"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Đã sao chép liên kết tiệm hoa Nana Xinh!');
                }}
                className="w-8 h-8 rounded-full bg-white border border-[#f6ebf0] flex items-center justify-center hover:bg-[#fdf2f2] transition"
                title="Chia sẻ"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenOurStory();
                }}
                className="w-8 h-8 rounded-full bg-white border border-[#f6ebf0] flex items-center justify-center hover:bg-[#fdf2f2] transition"
                title="Instagram / Moments"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                className="w-8 h-8 rounded-full bg-white border border-[#f6ebf0] flex items-center justify-center hover:bg-[#fdf2f2] transition"
                title="Tin nhắn"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line matching screenshot */}
        <div className="pt-6 border-t border-[#f6ebf0] text-center">
          <p className="text-[11px] text-[#8a7173]">
            © 2024 Nana Xinh Modern Florist. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
