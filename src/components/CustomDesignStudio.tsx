import React, { useState } from 'react';
import { X, Sparkles, Check, Heart, Palette, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { FlowerProduct } from '../types';

interface CustomDesignStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomProductToCart: (product: FlowerProduct, notes: string) => void;
}

export const CustomDesignStudio: React.FC<CustomDesignStudioProps> = ({
  isOpen,
  onClose,
  onAddCustomProductToCart,
}) => {
  if (!isOpen) return null;

  const [colorTone, setColorTone] = useState('Hồng Pastel & Trắng Kem');
  const [mainFlower, setMainFlower] = useState('Hoa Hồng Ecuador & Cẩm Tú Cầu');
  const [wrappingStyle, setWrappingStyle] = useState('Giấy lụa Hàn Quốc sang trọng');
  const [ribbon, setRibbon] = useState('Ruy băng lụa Berry Signature');
  const [budget, setBudget] = useState(850000);
  const [customNote, setCustomNote] = useState('');
  const [recipientPersonality, setRecipientPersonality] = useState('Nữ tính, thích sự dịu dàng và tinh tế');

  const colorOptions = [
    { name: 'Hồng Pastel & Trắng Kem', color: 'bg-rose-200 border-rose-300', img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop' },
    { name: 'Đỏ Nhung Quyền Quý', color: 'bg-red-700 border-red-800 text-white', img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop' },
    { name: 'Vàng Nắng Rực Rỡ & Cam', color: 'bg-amber-300 border-amber-400', img: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop' },
    { name: 'Trắng Tinh Khôi Parisian', color: 'bg-neutral-100 border-neutral-300', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Tím Khói & Lavender', color: 'bg-purple-300 border-purple-400', img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop' },
  ];

  const flowerOptions = [
    'Hoa Hồng Ecuador & Cẩm Tú Cầu',
    'Hoa Tulip Hà Lan & Baby Breath',
    'Hoa Mẫu Đơn & Lá Khuynh Diệp',
    'Hoa Hướng Dương & Cúc Tana',
    'Mix Đa Sắc Tự Nhiên Theo Mùa',
  ];

  const wrappingOptions = [
    'Giấy lụa Hàn Quốc sang trọng',
    'Hộp hoa tròn phong cách Paris',
    'Giỏ mây mộc mạc Vintage',
    'Bó hoa cắm bình thủy tinh sẵn',
  ];

  const currentTone = colorOptions.find((c) => c.name === colorTone) || colorOptions[0];

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const handleCreateAndAdd = () => {
    const customProduct: FlowerProduct = {
      id: `custom-design-${Date.now()}`,
      name: `Bó Hoa Thiết Kế Riêng: ${colorTone}`,
      subtitle: `Custom Bespoke Bouquet · ${mainFlower}`,
      vietnameseTitle: `Bó hoa thiết kế theo yêu cầu đặc biệt`,
      category: 'custom',
      price: budget,
      rating: 5.0,
      reviewsCount: 1,
      image: currentTone.img,
      tags: ['Thiết Kế Riêng', 'Bespoke', 'Artisan'],
      description: `Bó hoa thủ công nghệ nhân được phối theo phong cách: ${colorTone}, loài hoa chủ đạo: ${mainFlower}, phong cách gói: ${wrappingStyle}, ruy băng: ${ribbon}. Lời nhắn đặc biệt: ${customNote || 'Theo sự sáng tạo của Florist'}.`,
      meaning: 'Sáng tạo độc bản, trao gửi trọn vẹn dấu ấn cá nhân của người tặng.',
      careInstructions: [
        'Florist đính kèm sẵn nước dưỡng hoa chuyên biệt.',
        'Tránh ánh nắng gắt và nơi nhiệt độ cao.',
      ],
      flowerTypes: [mainFlower, 'Hoa lá phụ theo tone', 'Lá nhập khẩu'],
      colorTheme: colorTone,
      inStock: true,
    };

    onAddCustomProductToCart(
      customProduct,
      `Ghi chú thiết kế: ${colorTone}, ${mainFlower}, ${wrappingStyle}, ${ribbon}. Yêu cầu: ${customNote}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-2xl max-h-[92vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">
                Custom Design Studio
              </h2>
              <span className="text-[11px] text-[#8a7173]">
                Thiết kế hoa độc bản cùng Master Florist Nana Xinh
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

        {/* Scrollable Form */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
          
          {/* Visual Live Preview Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#f6ebf0] shadow-2xs flex flex-col sm:flex-row gap-4 items-center">
            <img
              src={currentTone.img}
              alt="Preview"
              className="w-full sm:w-36 h-36 rounded-xl object-cover shadow-xs border border-[#fce7e7]"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#a6354c] bg-[#fdf2f2] px-2.5 py-0.5 rounded-full">
                Bản Phối Trực Quan
              </span>
              <h3 className="font-serif text-base font-bold text-[#1f1a1e]">
                {colorTone}
              </h3>
              <p className="text-xs text-[#564143]">
                Hoa: <strong>{mainFlower}</strong>
              </p>
              <p className="text-xs text-[#564143]">
                Kiểu dáng: <strong>{wrappingStyle}</strong>
              </p>
              <p className="text-sm font-bold text-[#a6354c] pt-1">
                Dự trù ngân sách: {formatVND(budget)}
              </p>
            </div>
          </div>

          {/* Step 1: Color Palette */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#a6354c]" />
              <span>1. Chọn Tone Màu Chủ Đạo</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setColorTone(opt.name)}
                  className={`p-3 rounded-xl text-left border flex items-center justify-between transition ${
                    colorTone === opt.name
                      ? 'border-[#a6354c] bg-[#fdf2f2] font-semibold text-[#a6354c] shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  <span className="text-xs">{opt.name}</span>
                  <span className={`w-5 h-5 rounded-full border ${opt.color}`}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Main Flower Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e]">
              2. Chọn Loài Hoa Chủ Đạo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flowerOptions.map((flow) => (
                <button
                  key={flow}
                  onClick={() => setMainFlower(flow)}
                  className={`p-3 rounded-xl text-left border transition text-xs ${
                    mainFlower === flow
                      ? 'border-[#a6354c] bg-[#fdf2f2] font-semibold text-[#a6354c] shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  {flow}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Wrapping Style */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e]">
              3. Phong Cách Gói & Cắm
            </label>
            <div className="grid grid-cols-2 gap-2">
              {wrappingOptions.map((wrap) => (
                <button
                  key={wrap}
                  onClick={() => setWrappingStyle(wrap)}
                  className={`p-3 rounded-xl text-left border transition text-xs ${
                    wrappingStyle === wrap
                      ? 'border-[#a6354c] bg-[#fdf2f2] font-semibold text-[#a6354c] shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  {wrap}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Budget Slider */}
          <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#1f1a1e]">
                4. Mức Ngân Sách Dự Kiến:
              </label>
              <span className="font-bold text-sm text-[#a6354c]">
                {formatVND(budget)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={3000000}
              step={50000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#a6354c] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8a7173]">
              <span>500.000đ (Thanh lịch)</span>
              <span>1.500.000đ (Deluxe)</span>
              <span>3.000.000đ (Grandeur VIP)</span>
            </div>
          </div>

          {/* Step 5: Special Notes for Florist */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e]">
              5. Yêu Cầu Riêng Cho Florist
            </label>
            <textarea
              rows={2}
              placeholder="VD: Bạn gái mình thích phong cách hoa nhẹ nhàng, không xịt kim tuyến, thắt nơ dài buông lơi..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full p-3 text-xs rounded-xl bg-white border border-[#f6ebf0] focus:outline-none focus:border-[#a6354c]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#f6ebf0] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8a7173] block">Tổng chi phí dự tính:</span>
            <span className="font-bold text-base text-[#a6354c]">{formatVND(budget)}</span>
          </div>

          <button
            onClick={handleCreateAndAdd}
            className="px-6 py-3 bg-[#a6354c] hover:bg-[#861d36] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <span>Thêm Vào Giỏ Hàng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
