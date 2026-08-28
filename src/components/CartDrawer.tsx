import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping,
}) => {
  if (!isOpen) return null;

  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discountPercent: number; desc: string } | null>({
    code: 'NANAXINH10',
    discountPercent: 10,
    desc: 'Ưu đãi 10% chào mừng khách hàng mới',
  });
  const [voucherError, setVoucherError] = useState('');

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const rawSubtotal = cartItems.reduce((sum, item) => {
    const base = Math.round(item.product.price * item.sizeMultiplier);
    const vase = item.includeVase ? item.vasePrice : 0;
    return sum + (base + vase) * item.quantity;
  }, 0);

  const discountAmount = appliedVoucher
    ? Math.round(rawSubtotal * (appliedVoucher.discountPercent / 100))
    : 0;

  const shippingFee = rawSubtotal > 500000 ? 0 : 35000;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    const code = voucherCode.trim().toUpperCase();

    if (code === 'NANAXINH10') {
      setAppliedVoucher({ code, discountPercent: 10, desc: 'Giảm 10% đơn hàng' });
      setVoucherCode('');
    } else if (code === 'FREESHIP') {
      setAppliedVoucher({ code, discountPercent: 5, desc: 'Tặng 5% + Miễn phí vận chuyển' });
      setVoucherCode('');
    } else if (code === 'VIP20') {
      setAppliedVoucher({ code, discountPercent: 20, desc: 'Ưu đãi 20% thẻ thành viên VIP' });
      setVoucherCode('');
    } else {
      setVoucherError('Mã ưu đãi không hợp lệ. Thử: NANAXINH10 hoặc FREESHIP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#fce7e7]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1f1a1e]">Giỏ Hàng Của Bạn</h2>
              <span className="text-[11px] text-[#8a7173]">
                {cartItems.length} sản phẩm hoa tươi được chọn
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#a6354c] mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1f1a1e]">Giỏ hàng đang trống</h3>
            <p className="text-xs text-[#8a7173] max-w-xs mt-1.5 leading-relaxed">
              Hãy chọn những bó hoa tươi thắm để trao gửi yêu thương đến người bạn trân quý nhé!
            </p>
            <button
              onClick={() => {
                onClose();
                onStartShopping();
              }}
              className="mt-6 px-6 py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-semibold rounded-xl shadow-xs transition active:scale-95"
            >
              Khám Phá Bộ Sưu Tập Hoa
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.map((item) => {
              const itemPrice = Math.round(item.product.price * item.sizeMultiplier) + (item.includeVase ? item.vasePrice : 0);

              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#f6ebf0] shadow-2xs flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#fdf2f2]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-[#1f1a1e] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#8a7173] hover:text-[#ba1a1a] p-1 transition"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#fdf2f2] text-[#a6354c] font-medium">
                          {item.size === 'standard' ? 'Size Vừa' : item.size === 'deluxe' ? 'Size Deluxe' : 'Size VIP'}
                        </span>
                        {item.includeVase && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#fcf1f6] text-[#861d36] font-medium flex items-center gap-0.5">
                            <Droplets className="w-3 h-3" /> Kèm bình hoa
                          </span>
                        )}
                      </div>

                      {item.card && item.card.message && (
                        <div className="text-[10px] text-[#564143] bg-[#fff7f9] p-1.5 rounded-md mt-1.5 border border-[#fce7e7] line-clamp-1 italic">
                          💌 Thiệp: "{item.card.message}"
                        </div>
                      )}
                    </div>

                    {/* Price and Counter */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#fcf1f6]">
                      <span className="font-bold text-xs sm:text-sm text-[#a6354c]">
                        {formatVND(itemPrice * item.quantity)}
                      </span>

                      <div className="flex items-center gap-1.5 bg-[#fff7f9] border border-[#fce7e7] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md hover:bg-white text-[#564143] flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1f1a1e] w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md hover:bg-white text-[#564143] flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Voucher Box */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#f6ebf0] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1f1a1e]">
                <Tag className="w-3.5 h-3.5 text-[#a6354c]" />
                <span>Mã giảm giá / Ưu đãi hoa</span>
              </div>

              {appliedVoucher ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#fdf2f2] border border-[#ddbfc1] text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ee6c81]" />
                    <div>
                      <span className="font-bold text-[#a6354c]">{appliedVoucher.code}</span>
                      <span className="text-[10px] text-[#564143] block">{appliedVoucher.desc}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppliedVoucher(null)}
                    className="text-[11px] text-[#ba1a1a] hover:underline font-semibold"
                  >
                    Bỏ áp dụng
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập NANAXINH10 hoặc FREESHIP"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#fff7f9] border border-[#fce7e7] uppercase focus:outline-none focus:border-[#a6354c]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#a6354c] text-white text-xs font-bold rounded-xl hover:bg-[#861d36] transition"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {voucherError && (
                <p className="text-[10px] text-[#ba1a1a] font-medium">{voucherError}</p>
              )}
            </div>
          </div>
        )}

        {/* Footer Summary & Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#f6ebf0] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#564143]">
                <span>Tạm tính:</span>
                <span className="font-semibold text-[#1f1a1e]">{formatVND(rawSubtotal)}</span>
              </div>
              {appliedVoucher && (
                <div className="flex justify-between text-[#a6354c]">
                  <span>Giảm giá voucher:</span>
                  <span className="font-semibold">-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#564143]">
                <span>Phí giao hoa (2h):</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">Miễn phí</span> : formatVND(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#fcf1f6] flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#1f1a1e]">Tổng thanh toán:</span>
                <span className="font-bold text-lg text-[#a6354c]">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <button
              id="btn-proceed-checkout"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#a6354c] hover:bg-[#861d36] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiến Hành Đặt Hoa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
