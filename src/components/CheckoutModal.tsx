import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, Calendar, CreditCard, Sparkles, Truck, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Luong Minh');
  const [customerPhone, setCustomerPhone] = useState('0908123456');
  const [customerEmail, setCustomerEmail] = useState('minh.luong@example.com');
  const [recipientName, setRecipientName] = useState('Nguyễn Ngọc Mai');
  const [recipientPhone, setRecipientPhone] = useState('0912345678');
  const [recipientAddress, setRecipientAddress] = useState('123 Nguyễn Huệ, Phường Bến Nghé');
  const [deliveryDistrict, setDeliveryDistrict] = useState('Quận 1');
  const [deliveryCity, setDeliveryCity] = useState('TP. Hồ Chí Minh');
  const [deliveryDate, setDeliveryDate] = useState('Hôm nay (2 giờ)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('14:00 - 16:00');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'zalopay' | 'bank_transfer' | 'cod'>('momo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const rawSubtotal = cartItems.reduce((sum, item) => {
    const base = Math.round(item.product.price * item.sizeMultiplier);
    const vase = item.includeVase ? item.vasePrice : 0;
    return sum + (base + vase) * item.quantity;
  }, 0);

  const discount = Math.round(rawSubtotal * 0.1); // 10% auto promo
  const shippingFee = rawSubtotal > 500000 ? 0 : 35000;
  const grandTotal = Math.max(0, rawSubtotal - discount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `NNX-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleString('vi-VN'),
        items: cartItems,
        subtotal: rawSubtotal,
        discount,
        shippingFee,
        total: grandTotal,
        customerName,
        customerPhone,
        customerEmail,
        recipientName,
        recipientPhone,
        recipientAddress,
        deliveryDistrict,
        deliveryCity,
        deliveryDate,
        deliveryTimeSlot,
        paymentMethod,
        status: 'confirmed',
        voucherCode: 'NANAXINH10',
      };

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ee6c81', '#a6354c', '#ffb2ba', '#ffd9dc', '#ff9291'],
        });
      } catch (err) {
        // ignore
      }

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#1f1a1e]">
              {completedOrder ? 'Xác Nhận Đơn Hàng Thành Công' : 'Đặt Hoa & Thanh Toán'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
          {completedOrder ? (
            /* Order Success Receipt */
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-[#fdf2f2] text-[#a6354c] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a6354c] bg-[#fdf2f2] px-3 py-1 rounded-full">
                  Mã đơn: #{completedOrder.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1f1a1e] mt-2">
                  Cảm ơn bạn đã trao gửi niềm tin!
                </h3>
                <p className="text-xs text-[#564143] max-w-md mx-auto mt-1 leading-relaxed">
                  Florist nghệ nhân tại Nana Xinh đang cắm hoa và chuẩn bị thiệp nắn nót. Bó hoa sẽ được giao chuẩn giờ đến <strong className="text-[#1f1a1e]">{completedOrder.recipientName}</strong>.
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-white p-4 rounded-2xl border border-[#f6ebf0] text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-[#fcf1f6] pb-2">
                  <span className="text-[#8a7173]">Địa chỉ nhận hoa:</span>
                  <span className="font-semibold text-[#1f1a1e] text-right">
                    {completedOrder.recipientAddress}, {completedOrder.deliveryDistrict}, {completedOrder.deliveryCity}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#fcf1f6] pb-2">
                  <span className="text-[#8a7173]">Thời gian giao:</span>
                  <span className="font-semibold text-[#a6354c]">
                    {completedOrder.deliveryDate} ({completedOrder.deliveryTimeSlot})
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#fcf1f6] pb-2">
                  <span className="text-[#8a7173]">Phương thức thanh toán:</span>
                  <span className="font-bold text-[#1f1a1e] uppercase">
                    {completedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-bold text-sm text-[#1f1a1e]">Tổng cộng đã thanh toán:</span>
                  <span className="font-bold text-base text-[#a6354c]">
                    {formatVND(completedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Simulated VietQR / Momo instructions if QR chosen */}
              {completedOrder.paymentMethod === 'bank_transfer' && (
                <div className="p-3.5 bg-[#fdf2f2] rounded-2xl border border-[#ddbfc1] text-xs text-left space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#a6354c]">
                    <QrCode className="w-4 h-4" />
                    <span>Quét mã VietQR Chuyển Khoản Tự Động</span>
                  </div>
                  <p className="text-[11px] text-[#564143]">
                    Ngân hàng: <strong>MBBank</strong> - STK: <strong>88889999NANA</strong> - Chủ TK: <strong>NANA XINH FLORIST</strong>
                  </p>
                  <p className="text-[11px] text-[#564143]">
                    Nội dung CK: <strong className="text-[#a6354c]">{completedOrder.id}</strong>
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#a6354c] hover:bg-[#861d36] text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Hoàn Tất & Về Trang Chủ
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Recipient Information */}
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1f1a1e]">
                  <MapPin className="w-4 h-4 text-[#a6354c]" />
                  <span>Thông Tin Người Nhận Hoa</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Họ tên người nhận *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nguyễn Thị Mai..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="0908..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                    Địa chỉ chi tiết (Số nhà, Tên đường, Tòa nhà) *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="VD: 123 Lê Lợi, P. Bến Thành"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Quận / Huyện
                    </label>
                    <select
                      value={deliveryDistrict}
                      onChange={(e) => setDeliveryDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e]"
                    >
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 3">Quận 3</option>
                      <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                      <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
                      <option value="TP. Thủ Đức">TP. Thủ Đức</option>
                      <option value="Quận 7">Quận 7</option>
                      <option value="Quận Hoàn Kiếm (HN)">Quận Hoàn Kiếm (Hà Nội)</option>
                      <option value="Quận Ba Đình (HN)">Quận Ba Đình (Hà Nội)</option>
                      <option value="Quận Cầu Giấy (HN)">Quận Cầu Giấy (Hà Nội)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e]"
                    >
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Timing */}
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1f1a1e]">
                  <Calendar className="w-4 h-4 text-[#a6354c]" />
                  <span>Khung Giờ Nhận Hoa</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e]"
                  >
                    <option value="Hôm nay (2 giờ)">Giao hỏa tốc 2 giờ</option>
                    <option value="Sáng mai">Sáng mai (08:00 - 11:30)</option>
                    <option value="Chiều mai">Chiều mai (13:30 - 17:00)</option>
                    <option value="Ngày kỷ niệm theo lịch">Đặt lịch trước ngày lễ</option>
                  </select>

                  <input
                    type="text"
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    placeholder="VD: 15:30"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1f1a1e]">
                  <CreditCard className="w-4 h-4 text-[#a6354c]" />
                  <span>Phương Thức Thanh Toán</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'momo', name: 'Ví MoMo', desc: 'Quét mã siêu tốc' },
                    { id: 'bank_transfer', name: 'VietQR / Ngân hàng', desc: 'Chuyển khoản 24/7' },
                    { id: 'zalopay', name: 'ZaloPay', desc: 'Thanh toán trực tiếp' },
                    { id: 'cod', name: 'COD', desc: 'Thanh toán khi nhận hoa' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition ${
                        paymentMethod === method.id
                          ? 'border-[#a6354c] bg-[#fdf2f2] text-[#a6354c] font-bold shadow-2xs'
                          : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                      }`}
                    >
                      <span className="text-xs block">{method.name}</span>
                      <span className="text-[10px] text-[#8a7173] block">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order total & CTA */}
              <div className="pt-2 border-t border-[#fcf1f6] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8a7173] block">Tổng thanh toán:</span>
                  <span className="font-bold text-lg text-[#a6354c]">{formatVND(grandTotal)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#a6354c] hover:bg-[#861d36] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {isSubmitting ? 'Đang xử lý đơn hoa...' : 'Xác Nhận Đặt Hoa'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
