import React from 'react';
import { Truck, Palette, Sprout, Sparkles, ShieldCheck } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      id: 'farm-fresh',
      title: 'Farm Fresh',
      description: 'Sourced directly from premium growers to ensure maximum bloom life and vibrant colors.',
      icon: <Sprout className="w-6 h-6 text-[#a6354c]" />,
    },
    {
      id: 'same-day',
      title: 'Same Day Delivery',
      description: 'Carefully transported in climate-controlled vehicles to preserve freshness upon arrival.',
      icon: <Truck className="w-6 h-6 text-[#a6354c]" />,
    },
    {
      id: 'artisan-crafted',
      title: 'Artisan Crafted',
      description: 'Each arrangement is meticulously designed by our expert florists with an eye for detail.',
      icon: <ShieldCheck className="w-6 h-6 text-[#a6354c]" />,
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-[#f6ebf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Responsive Grid matching Desktop Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-transparent transition-all group"
            >
              {/* Soft pink squircle icon matching screenshot */}
              <div className="w-14 h-14 rounded-2xl bg-[#fdf2f5] border border-[#fce7e7] flex items-center justify-center shadow-xs mb-4 group-hover:scale-110 group-hover:bg-[#ffb2ba]/30 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1f1a1e] tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#564143] leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
