import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FlowerProduct } from '../types';

interface AIFloristModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: FlowerProduct[];
  onSelectProduct: (product: FlowerProduct) => void;
}

export const AIFloristModal: React.FC<AIFloristModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [recipient, setRecipient] = useState('Người yêu / Vợ');
  const [occasion, setOccasion] = useState('Sinh nhật');
  const [emotion, setEmotion] = useState('Lãng mạn & Ngọt ngào');
  const [budgetRange, setBudgetRange] = useState('Dưới 800.000đ');
  const [aiResult, setAiResult] = useState<{
    recommendedProduct: FlowerProduct;
    reason: string;
    greetingCardSuggestion: string;
    symbolism: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleConsult = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Pick matching product
      let matched = products[0];
      if (occasion === 'Khai trương' || occasion === 'Chúc mừng thành công') {
        matched = products.find((p) => p.id === 'sunshine') || products[0];
      } else if (emotion === 'Sang trọng & Quyền lực' || occasion === 'Kỷ niệm ngày cưới') {
        matched = products.find((p) => p.id === 'tinh-nong') || products[0];
      } else if (recipient === 'Mẹ / Gia đình' || emotion === 'Biết ơn & Kính trọng') {
        matched = products.find((p) => p.id === 'cam-tu-cau') || products[0];
      } else if (recipient === 'Bạn thân / Tốt nghiệp') {
        matched = products.find((p) => p.id === 'baby-pink') || products[0];
      } else {
        matched = products.find((p) => p.id === 'dau-ngot') || products[0];
      }

      setAiResult({
        recommendedProduct: matched,
        reason: `Mẫu "${matched.name}" với tone màu ${matched.colorTheme} là sự lựa chọn hoàn hảo nhất để truyền tải cảm xúc ${emotion.toLowerCase()} nhân dịp ${occasion.toLowerCase()} cho ${recipient.toLowerCase()}.`,
        greetingCardSuggestion: `Gửi tặng ${recipient.toLowerCase()} những đóa hoa rạng rỡ nhất! Chúc ${recipient.toLowerCase()} luôn hạnh phúc, an yên và ngập tràn niềm vui trong ngày đặc biệt này.`,
        symbolism: matched.meaning,
      });
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ee6c81] to-[#a6354c] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-[#1f1a1e]">
                AI Florist Consultant
              </h2>
              <span className="text-[11px] text-[#8a7173]">
                Gợi ý hoa & lời chúc tinh tế dành riêng cho bạn
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
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
          
          {/* Question 1: Recipient */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1f1a1e]">
              1. Bạn muốn trao gửi hoa đến ai?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {['Người yêu / Vợ', 'Mẹ / Gia đình', 'Bạn thân', 'Đồng nghiệp / Sếp', 'Đối tác kinh doanh'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRecipient(r)}
                  className={`p-2 rounded-xl text-xs text-center border transition ${
                    recipient === r
                      ? 'border-[#a6354c] bg-[#fdf2f2] text-[#a6354c] font-bold shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Occasion */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1f1a1e]">
              2. Dịp tặng hoa là gì?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {['Sinh nhật', 'Kỷ niệm ngày cưới', 'Khai trương', 'Tốt nghiệp', 'Xin lỗi / Làm lành', 'Ngày bình thường'].map((o) => (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  className={`p-2 rounded-xl text-xs text-center border transition ${
                    occasion === o
                      ? 'border-[#a6354c] bg-[#fdf2f2] text-[#a6354c] font-bold shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Emotion Tone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1f1a1e]">
              3. Cảm xúc bạn muốn truyền tải?
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['Lãng mạn & Ngọt ngào', 'Biết ơn & Kính trọng', 'Tươi vui & Rạng rỡ', 'Sang trọng & Quyền lực'].map((e) => (
                <button
                  key={e}
                  onClick={() => setEmotion(e)}
                  className={`p-2 rounded-xl text-xs text-center border transition ${
                    emotion === e
                      ? 'border-[#a6354c] bg-[#fdf2f2] text-[#a6354c] font-bold shadow-2xs'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Consult Button */}
          <button
            onClick={handleConsult}
            disabled={isAnalyzing}
            className="w-full py-3 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#ffb2ba]" />
            <span>{isAnalyzing ? 'AI Florist đang phân tích...' : 'Nhận Gợi Ý Hoa & Lời Chúc'}</span>
          </button>

          {/* AI Result Card */}
          {aiResult && (
            <div className="p-4 bg-white rounded-2xl border border-[#ddbfc1] shadow-xs space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-[#a6354c]">
                <Bot className="w-4 h-4" />
                <span>Gợi ý từ Nghệ Nhân AI Nana Xinh</span>
              </div>

              {/* Recommended bouquet preview */}
              <div className="flex gap-3 p-2 bg-[#fff7f9] rounded-xl border border-[#fce7e7]">
                <img
                  src={aiResult.recommendedProduct.image}
                  alt={aiResult.recommendedProduct.name}
                  className="w-16 h-16 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-[#1f1a1e]">
                    {aiResult.recommendedProduct.name}
                  </h4>
                  <p className="text-[11px] text-[#8a7173] truncate">
                    {aiResult.recommendedProduct.subtitle}
                  </p>
                  <span className="font-bold text-xs text-[#a6354c] block mt-1">
                    {new Intl.NumberFormat('vi-VN').format(aiResult.recommendedProduct.price)}đ
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#564143] space-y-2">
                <p>
                  <strong className="text-[#1f1a1e]">Lý do chọn: </strong>
                  {aiResult.reason}
                </p>
                <div className="p-2.5 bg-[#fdf2f2] rounded-xl text-[#a6354c]">
                  <strong className="block mb-0.5">Ý nghĩa hoa:</strong>
                  <span>{aiResult.symbolism}</span>
                </div>
                <div className="p-2.5 bg-[#fff7f9] rounded-xl border border-[#fce7e7]">
                  <strong className="block text-[#1f1a1e] mb-0.5">Lời chúc gợi ý viết thiệp:</strong>
                  <span className="italic text-[#564143]">"{aiResult.greetingCardSuggestion}"</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectProduct(aiResult.recommendedProduct);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Xem Chi Tiết Mẫu Hoa Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
