import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS } from '../data/flowerData';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-4 mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1f1a1e]">
            Khách Hàng Nói Về Nana Xinh
          </h3>
          <p className="text-xs text-[#8a7173]">
            Hơn 10.000+ món quà hoa đã trao gửi trọn vẹn
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[#fdf2f2] px-2.5 py-1 rounded-full text-xs font-bold text-[#a6354c] border border-[#ddbfc1]">
          <Star className="w-3.5 h-3.5 fill-[#ee6c81] text-[#ee6c81]" />
          <span>4.9 / 5.0</span>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-4 bg-white/90 rounded-2xl border border-[#f6ebf0] shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-9 h-9 rounded-full object-cover border border-[#fce7e7]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#1f1a1e]">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-md">
                        Đã mua hàng
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8a7173]">{rev.date} · Mẫu: {rev.productName}</span>
                </div>
              </div>

              <div className="flex text-[#ee6c81]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#ee6c81]" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#564143] leading-relaxed italic">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
