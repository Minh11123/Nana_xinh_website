import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenZaloChat: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenZaloChat,
}) => {
  if (!isOpen) return null;

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] border border-[#ddbfc1] flex items-center justify-center text-[#a6354c]">
              <Phone className="w-4 h-4 text-[#a6354c]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">
                Liên Hệ Tiệm Hoa Nana Xinh
              </h2>
              <span className="text-[11px] text-[#8a7173]">
                Atelier hoa tươi nghệ thuật tại TP.HCM & Hà Nội
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
          
          {/* Quick contact buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:0908120202"
              className="p-4 bg-white rounded-2xl border border-[#f6ebf0] flex items-center gap-3.5 hover:border-[#a6354c] transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fdf2f2] text-[#a6354c] flex items-center justify-center group-hover:scale-105 transition">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#8a7173] block">Hotline đặt hoa nhanh</span>
                <strong className="text-sm text-[#1f1a1e] font-bold">0908 120 202</strong>
              </div>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenZaloChat();
              }}
              className="p-4 bg-white rounded-2xl border border-[#f6ebf0] flex items-center gap-3.5 hover:border-[#0068FF] transition group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0068FF] flex items-center justify-center group-hover:scale-105 transition">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#8a7173] block">Chat Zalo tư vấn 24/7</span>
                <strong className="text-sm text-[#0068FF] font-bold">Nana Xinh Official</strong>
              </div>
            </button>
          </div>

          {/* Boutique Locations */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#1f1a1e] uppercase tracking-wider">
              Hệ Thống Cửa Hàng
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2">
                <div className="flex items-center gap-2 text-[#a6354c] font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Chi nhánh TP. Hồ Chí Minh</span>
                </div>
                <p className="text-xs text-[#564143]">
                  88 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8a7173]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>07:00 - 22:00 (Thứ 2 - Chủ Nhật)</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2">
                <div className="flex items-center gap-2 text-[#a6354c] font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Chi nhánh Hà Nội</span>
                </div>
                <p className="text-xs text-[#564143]">
                  45 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8a7173]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>07:30 - 21:30 (Thứ 2 - Chủ Nhật)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white p-5 rounded-2xl border border-[#f6ebf0] space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#1f1a1e]">
              Gửi Tin Nhắn / Yêu Cầu Hoa Sự Kiện
            </h3>
            
            {formSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cảm ơn bạn! Tiệm hoa đã nhận được thông tin và sẽ gọi lại trong 15 phút.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#fff7f9] border border-[#fce7e7] rounded-xl focus:outline-none focus:border-[#a6354c]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#fff7f9] border border-[#fce7e7] rounded-xl focus:outline-none focus:border-[#a6354c]"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Yêu cầu về mẫu hoa, ngân sách hoặc thời gian giao mong muốn..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#fff7f9] border border-[#fce7e7] rounded-xl focus:outline-none focus:border-[#a6354c]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Thông Tin Cho Florist</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
