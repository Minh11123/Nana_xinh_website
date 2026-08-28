import React, { useState } from 'react';
import { X, User, Package, MapPin, Award, Gift, ChevronRight, Phone, Mail, Clock } from 'lucide-react';
import { Order } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'loyalty'>('profile');

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-lg max-h-[92vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a6354c] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              LM
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#1f1a1e]">Luong Minh</h2>
              <span className="text-[11px] text-[#a6354c] font-semibold bg-[#fdf2f2] px-2 py-0.5 rounded-full">
                Hạng VIP: Hoa Hồng Đỏ (Giảm 10%)
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[#f6ebf0] bg-white">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs font-bold text-center transition ${
              activeTab === 'profile'
                ? 'text-[#a6354c] border-b-2 border-[#a6354c] bg-[#fff7f9]'
                : 'text-[#564143] hover:text-[#1f1a1e]'
            }`}
          >
            Tài Khoản
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-xs font-bold text-center transition ${
              activeTab === 'orders'
                ? 'text-[#a6354c] border-b-2 border-[#a6354c] bg-[#fff7f9]'
                : 'text-[#564143] hover:text-[#1f1a1e]'
            }`}
          >
            Đơn Hàng ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`flex-1 py-3 text-xs font-bold text-center transition ${
              activeTab === 'loyalty'
                ? 'text-[#a6354c] border-b-2 border-[#a6354c] bg-[#fff7f9]'
                : 'text-[#564143] hover:text-[#1f1a1e]'
            }`}
          >
            Ưu Đãi & Điểm
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
          
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
                <h4 className="font-bold text-xs text-[#1f1a1e] uppercase tracking-wider">
                  Thông tin cá nhân
                </h4>
                <div className="space-y-2 text-xs text-[#564143]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#a6354c]" />
                    <span>Họ tên: <strong>Lương Văn Minh</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#a6354c]" />
                    <span>Số điện thoại: <strong>0908 120 202</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#a6354c]" />
                    <span>Email: <strong>luongvanminh12022002@gmail.com</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#a6354c]" />
                    <span>Địa chỉ nhận thường dùng: <strong>Quận 1, TP. Hồ Chí Minh</strong></span>
                  </div>
                </div>
              </div>

              {/* Boutique Locations */}
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2.5">
                <h4 className="font-bold text-xs text-[#1f1a1e] uppercase tracking-wider">
                  Hệ Thống Tiệm Hoa Nana Xinh
                </h4>
                <div className="text-xs text-[#564143] space-y-2">
                  <div className="p-2.5 bg-[#fff7f9] rounded-xl border border-[#fce7e7]">
                    <span className="font-bold text-[#1f1a1e] block">Atelier TP. Hồ Chí Minh:</span>
                    <span>88 Nguyễn Huệ, Phường Bến Nghé, Quận 1 (Mở cửa: 07:00 - 22:00)</span>
                  </div>
                  <div className="p-2.5 bg-[#fff7f9] rounded-xl border border-[#fce7e7]">
                    <span className="font-bold text-[#1f1a1e] block">Atelier Hà Nội:</span>
                    <span>45 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội (Mở cửa: 07:30 - 21:30)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-[#f6ebf0]">
                  <Package className="w-10 h-10 text-[#8a7173] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1f1a1e]">Bạn chưa có đơn hoa nào</p>
                  <p className="text-[11px] text-[#8a7173] mt-0.5">
                    Các đơn hàng của bạn sẽ được hiển thị và cập nhật trạng thái trực tiếp tại đây.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-white rounded-2xl border border-[#f6ebf0] shadow-2xs space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-[#fcf1f6] pb-2">
                      <span className="font-bold text-xs text-[#a6354c]">
                        #{order.id}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Đang chuẩn bị hoa
                      </span>
                    </div>

                    <div className="text-xs text-[#564143] space-y-1">
                      <p>Người nhận: <strong>{order.recipientName}</strong></p>
                      <p>Ngày giao: <strong>{order.deliveryDate} ({order.deliveryTimeSlot})</strong></p>
                      <p>Tổng tiền: <strong className="text-[#a6354c]">{formatVND(order.total)}</strong></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-tr from-[#a6354c] to-[#ee6c81] text-white rounded-2xl shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">
                      Nana Xinh VIP Club
                    </span>
                    <h3 className="font-serif text-xl font-bold mt-0.5">850 Điểm Tích Lũy</h3>
                  </div>
                  <Award className="w-8 h-8 opacity-80" />
                </div>
                <p className="text-xs text-rose-100">
                  Tích thêm 150 điểm để nâng hạng Diamond và nhận voucher hoa tươi 200.000đ mỗi dịp sinh nhật!
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2">
                <h4 className="font-bold text-xs text-[#1f1a1e] uppercase tracking-wider">
                  Voucher Của Bạn
                </h4>
                <div className="p-3 bg-[#fdf2f2] rounded-xl border border-[#ddbfc1] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#a6354c] block">Mã: NANAXINH10</span>
                    <span className="text-[11px] text-[#564143]">Giảm 10% cho mọi đơn hàng hoa tươi</span>
                  </div>
                  <span className="text-[10px] text-[#8a7173]">Vô thời hạn</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
