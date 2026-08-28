import React from 'react';
import { X, Heart, Sparkles, Award, MapPin, CheckCircle2 } from 'lucide-react';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopCollection: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({
  isOpen,
  onClose,
  onShopCollection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] border border-[#ddbfc1] flex items-center justify-center text-[#a6354c]">
              <Sparkles className="w-4 h-4 text-[#a6354c]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">
                Câu Chuyện Nana Xinh · Our Story
              </h2>
              <span className="text-[11px] text-[#8a7173]">
                Hành trình từ niềm đam mê hoa tươi đến Atelier nghệ thuật
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

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Hero image with quote */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop"
              alt="Atelier Nana Xinh"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#ffd9dc] font-semibold">
                Est. 2024 · Modern Florist
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold mt-1 leading-snug">
                "Mỗi đóa hoa là một sứ giả của tình yêu, sự biết ơn và những khoảnh khắc đáng nhớ."
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="space-y-3 text-xs sm:text-sm text-[#564143] leading-relaxed">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1f1a1e]">
              Triết lý cắm hoa tự nhiên & tinh tế
            </h3>
            <p>
              Tại <strong>Nana Xinh</strong>, chúng tôi tin rằng hoa tươi không đơn thuần là món quà tặng, mà là ngôn ngữ sâu lắng nhất để kết nối trái tim. Từng cành hoa được tuyển lựa nghiêm ngặt mỗi sáng sớm từ các nông trại cao cấp tại Đà Lạt và nhập khẩu trực tiếp từ Hà Lan, Ecuador, Nhật Bản.
            </p>
            <p>
              Dưới bàn tay khéo léo của các nghệ nhân florist, mỗi tác phẩm hoa mang dấu ấn độc bản, kết hợp giữa phong cách thanh lịch hiện đại và nét tự nhiên phóng khoáng.
            </p>
          </div>

          {/* Core values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#fdf2f2] flex items-center justify-center text-[#a6354c] font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1f1a1e]">100% Hoa Tươi Mới</h4>
              <p className="text-[11px] text-[#8a7173]">
                Nhập mới mỗi ngày, bảo quản ở nhiệt độ chuẩn 18°C.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#fdf2f2] flex items-center justify-center text-[#a6354c] font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1f1a1e]">Nghệ Nhân Tâm Huyết</h4>
              <p className="text-[11px] text-[#8a7173]">
                Florist giàu kinh nghiệm, chăm chút từng chi tiết nhỏ.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#fdf2f2] flex items-center justify-center text-[#a6354c] font-bold">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1f1a1e]">Giao Hỏa Tốc 2H</h4>
              <p className="text-[11px] text-[#8a7173]">
                Đóng gói chuyên dụng chống dập, gửi ảnh duyệt trước khi giao.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#f6ebf0] flex items-center justify-between">
          <span className="text-xs text-[#8a7173]">
            Sẵn sàng tìm kiếm bó hoa hoàn hảo cho bạn?
          </span>
          <button
            onClick={() => {
              onClose();
              onShopCollection();
            }}
            className="px-5 py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            Khám Phá Bộ Sưu Tập
          </button>
        </div>

      </div>
    </div>
  );
};
