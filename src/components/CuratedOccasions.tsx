import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OCCASIONS } from '../data/flowerData';
import { OccasionCategory } from '../types';

interface CuratedOccasionsProps {
  onSelectOccasion: (id: string) => void;
  onViewAll: () => void;
}

export const CuratedOccasions: React.FC<CuratedOccasionsProps> = ({
  onSelectOccasion,
  onViewAll,
}) => {
  // 4 main curated occasions: Birthday, Grand Opening, Graduation, Custom Design
  const displayOccasions = OCCASIONS.slice(0, 4);

  return (
    <section className="w-full bg-white py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header matching Screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f1a1e] tracking-tight">
            Curated Occasions
          </h2>
          <p className="text-xs sm:text-sm text-[#564143] mt-2 font-normal">
            Find the perfect arrangement for every special moment.
          </p>
        </div>

        {/* 4-Column Responsive Grid (1 col on xs, 2 on sm, 4 on lg) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayOccasions.map((occasion: OccasionCategory) => {
            const isCustom = occasion.id === 'custom';
            const actionLabel = isCustom ? 'INQUIRE' : 'SHOP NOW';

            return (
              <div
                key={occasion.id}
                id={`card-occasion-${occasion.id}`}
                onClick={() => onSelectOccasion(occasion.id)}
                className="group relative aspect-[3/4.2] sm:aspect-[3/4.4] w-full rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#f6ebf0] flex flex-col justify-end"
              >
                {/* Background Floral Image */}
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Smooth Dark Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Card Content */}
                <div className="relative z-10 p-4 sm:p-5 text-center flex flex-col items-center gap-1 sm:gap-1.5">
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide drop-shadow-sm">
                    {occasion.title}
                  </h3>

                  {/* Subtitle / Vietnamese category */}
                  <span className="text-[10px] text-[#ffd9dc] opacity-90 font-medium">
                    {occasion.vietnameseTitle}
                  </span>

                  {/* Action Link: SHOP NOW / INQUIRE */}
                  <span className="mt-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 group-hover:text-[#ffd9dc] group-hover:underline underline-offset-4 transition flex items-center gap-1">
                    <span>{actionLabel}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
