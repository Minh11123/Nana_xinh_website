import React from 'react';
import { X, Droplets, Sun, Scissors, Thermometer, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FlowerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlowerCareModal: React.FC<FlowerCareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tips = [
    {
      icon: <Scissors className="w-5 h-5 text-[#a6354c]" />,
      title: '1. Cắt vát gốc 45 độ',
      desc: 'Dùng kéo sắc cắt chéo gốc cành từ 1-2 cm dưới vòi nước để hoa hút nước tốt nhất và không bị bọt khí nghẽn mạch.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#a6354c]" />,
      title: '2. Nước sạch & Gói dưỡng hoa',
      desc: 'Pha gói dưỡng hoa Chrysal (tặng kèm trong mỗi bó của Nana Xinh) vào bình nước mát. Thay nước mới mỗi 2 ngày.',
    },
    {
      icon: <Sun className="w-5 h-5 text-[#a6354c]" />,
      title: '3. Tránh nắng gắt & gió máy lạnh',
      desc: 'Đặt bình hoa ở nơi thoáng mát, tránh ánh nắng mặt trời trực tiếp, quạt gió mạnh hoặc luồng gió phả thẳng từ máy lạnh.',
    },
    {
      icon: <Thermometer className="w-5 h-5 text-[#a6354c]" />,
      title: '4. Tỉa lá dưới mực nước',
      desc: 'Loại bỏ các lá nằm dưới mực nước trong bình để tránh lá phân hủy sinh vi khuẩn làm thối nước.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c]">
              <Droplets className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">
              Bí Quyết Giữ Hoa Tươi Lâu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tips list */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-3">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border border-[#f6ebf0] flex items-start gap-3.5 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fdf2f2] shrink-0 flex items-center justify-center">
                {tip.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-[#1f1a1e]">
                  {tip.title}
                </h4>
                <p className="text-xs text-[#564143] leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="p-4 bg-[#fdf2f2] rounded-2xl border border-[#ddbfc1] text-xs text-[#a6354c] flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 shrink-0 text-[#a6354c]" />
            <p>
              Nana Xinh cam kết bảo hành hoa tươi 100% khi nhận hàng. Nếu có bất kỳ vấn đề nào, hãy liên hệ ngay hotline để được hỗ trợ đổi bó hoa mới nhé!
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-[#f6ebf0]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Đã Hiểu
          </button>
        </div>

      </div>
    </div>
  );
};
