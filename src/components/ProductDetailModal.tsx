import React, { useState } from 'react';
import { X, Heart, Plus, Minus, Sparkles, Check, Clock, Calendar, ShieldCheck, Truck, Droplets } from 'lucide-react';
import { FlowerProduct, GreetingCard } from '../types';
import { PRESET_GREETINGS } from '../data/flowerData';

interface ProductDetailModalProps {
  product: FlowerProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: FlowerProduct,
    quantity: number,
    size: 'standard' | 'deluxe' | 'grandeur',
    card?: GreetingCard,
    includeVase?: boolean,
    deliveryDate?: string,
    deliveryTimeSlot?: string,
    specialNotes?: string
  ) => void;
  onBuyNow: (
    product: FlowerProduct,
    quantity: number,
    size: 'standard' | 'deluxe' | 'grandeur',
    card?: GreetingCard,
    includeVase?: boolean,
    deliveryDate?: string,
    deliveryTimeSlot?: string
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: FlowerProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'standard' | 'deluxe' | 'grandeur'>('standard');
  const [includeVase, setIncludeVase] = useState(false);
  const [showCardCustomizer, setShowCardCustomizer] = useState(false);
  const [cardTo, setCardTo] = useState('');
  const [cardFrom, setCardFrom] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardTheme, setCardTheme] = useState<'vintage-rose' | 'minimal-ivory' | 'pastel-blush' | 'botanical-gold'>('vintage-rose');
  const [deliveryDate, setDeliveryDate] = useState('Hôm nay');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Giao hỏa tốc 2 giờ');
  const [specialNotes, setSpecialNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'story' | 'care' | 'includes'>('story');

  const sizeMultiplier = size === 'standard' ? 1.0 : size === 'deluxe' ? 1.3 : 1.6;
  const basePrice = Math.round(product.price * sizeMultiplier);
  const vasePrice = includeVase ? 85000 : 0;
  const totalPrice = (basePrice + vasePrice) * quantity;

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const handleApplyPresetGreeting = (msg: string) => {
    setCardMessage(msg);
  };

  const handleGenerateAiMessage = () => {
    const aiGreetings = [
      `Gửi người con gái anh yêu món quà ngọt ngào nhất. Mong em luôn rạng rỡ và hạnh phúc như những bông hoa ${product.name} này!`,
      `Chúc mừng ngày đặc biệt! Chúc cho mọi ước mơ của bạn đều sớm nở hoa rực rỡ và thành công vang dội.`,
      `Cảm ơn Mẹ đã luôn là bến đỗ bình yên nhất. Kính chúc Mẹ luôn tràn đầy sức khỏe và bình an!`,
      `Tình yêu và sự quan tâm chân thành nhất gửi đến em, cảm ơn em đã luôn đồng hành cùng anh.`
    ];
    const randomMsg = aiGreetings[Math.floor(Math.random() * aiGreetings.length)];
    setCardMessage(randomMsg);
  };

  const handleAdd = () => {
    const card: GreetingCard | undefined =
      showCardCustomizer && cardMessage.trim()
        ? {
            to: cardTo || 'Người nhận yêu thương',
            from: cardFrom || 'Người gửi ẩn danh',
            message: cardMessage,
            theme: cardTheme,
            occasion: product.category,
          }
        : undefined;

    onAddToCart(
      product,
      quantity,
      size,
      card,
      includeVase,
      deliveryDate,
      deliveryTimeSlot,
      specialNotes
    );
    onClose();
  };

  const handleInstantBuy = () => {
    const card: GreetingCard | undefined =
      showCardCustomizer && cardMessage.trim()
        ? {
            to: cardTo || 'Người nhận yêu thương',
            from: cardFrom || 'Người gửi ẩn danh',
            message: cardMessage,
            theme: cardTheme,
            occasion: product.category,
          }
        : undefined;

    onBuyNow(
      product,
      quantity,
      size,
      card,
      includeVase,
      deliveryDate,
      deliveryTimeSlot
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#fff7f9] w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Top Sticky Header */}
        <div className="px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#f6ebf0] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a6354c] bg-[#fdf2f2] px-2.5 py-0.5 rounded-full">
              {product.subtitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition active:scale-90"
              aria-label="Thêm vào yêu thích"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#a6354c] text-[#a6354c]' : ''
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#fcf1f6] text-[#564143] hover:text-[#1f1a1e] transition active:scale-90"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* Main Visual Carousel / Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#f6ebf0]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                {product.colorTheme}
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === imgUrl ? 'border-[#a6354c] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Pricing */}
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1a1e] tracking-tight">
                {product.name}
              </h2>
              <div className="text-right">
                <span className="font-bold text-xl sm:text-2xl text-[#a6354c]">
                  {formatVND(basePrice)}
                </span>
                {product.originalPrice && (
                  <span className="block text-xs text-[#8a7173] line-through">
                    {formatVND(product.originalPrice * sizeMultiplier)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#564143] font-medium mt-1">
              {product.vietnameseTitle}
            </p>
          </div>

          {/* Bouquet Size Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#564143]">
              Kích thước bó hoa
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', name: 'Tiêu chuẩn', desc: 'Bó vừa thanh lịch', tag: 'Standard' },
                { id: 'deluxe', name: 'Deluxe (+30%)', desc: 'Nhiều hoa & bồng bềnh', tag: '+30% hoa' },
                { id: 'grandeur', name: 'Grandeur (+60%)', desc: 'Size đại sang trọng', tag: 'Luxury VIP' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSize(item.id as any)}
                  className={`p-3 rounded-xl text-left border transition ${
                    size === item.id
                      ? 'border-[#a6354c] bg-[#fdf2f2] text-[#a6354c] shadow-2xs font-semibold'
                      : 'border-[#f6ebf0] bg-white text-[#564143] hover:border-[#ddbfc1]'
                  }`}
                >
                  <span className="block text-xs font-bold">{item.name}</span>
                  <span className="block text-[10px] text-[#8a7173] mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add Vase Option */}
          <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#f6ebf0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#fdf2f2] flex items-center justify-center text-[#a6354c]">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1f1a1e] block">
                  Kèm Bình Thuỷ Tinh Cao Cấp (+85.000đ)
                </span>
                <span className="text-[11px] text-[#8a7173]">
                  Phù hợp chưng bàn làm việc & phòng khách
                </span>
              </div>
            </div>
            <button
              onClick={() => setIncludeVase(!includeVase)}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition ${
                includeVase
                  ? 'bg-[#a6354c] border-[#a6354c] text-white'
                  : 'border-[#ddbfc1] bg-white'
              }`}
            >
              {includeVase && <Check className="w-4 h-4 stroke-[2.5]" />}
            </button>
          </div>

          {/* Greeting Card Section */}
          <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ee6c81]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e]">
                  Thiệp viết tay ý nghĩa (Miễn phí)
                </span>
              </div>
              <button
                onClick={() => setShowCardCustomizer(!showCardCustomizer)}
                className="text-xs font-semibold text-[#a6354c] hover:underline"
              >
                {showCardCustomizer ? 'Thu gọn' : '+ Viết thiệp'}
              </button>
            </div>

            {showCardCustomizer && (
              <div className="space-y-3 pt-2 border-t border-[#fcf1f6] animate-fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Người nhận (To)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Em yêu, Mẹ kính yêu..."
                      value={cardTo}
                      onChange={(e) => setCardTo(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#8a7173] block mb-1">
                      Người gửi (From)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Anh Nam, Bạn thân..."
                      value={cardFrom}
                      onChange={(e) => setCardFrom(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-semibold text-[#8a7173]">
                      Nội dung lời chúc
                    </label>
                    <button
                      onClick={handleGenerateAiMessage}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#a6354c] hover:underline"
                    >
                      <Sparkles className="w-3 h-3 text-[#ee6c81]" />
                      Gợi ý AI
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Nhập lời chúc chân thành bạn muốn gửi gắm..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full p-3 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
                  />
                </div>

                {/* Preset Fast Greetings */}
                <div>
                  <span className="text-[10px] text-[#8a7173] block mb-1.5 font-medium">
                    Lời chúc gợi ý nhanh:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_GREETINGS[0].messages.slice(0, 2).map((msg, i) => (
                      <button
                        key={i}
                        onClick={() => handleApplyPresetGreeting(msg)}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-[#fdf2f2] text-[#564143] hover:bg-[#ffb2ba]/30 hover:text-[#a6354c] transition text-left"
                      >
                        {msg.length > 35 ? msg.substring(0, 35) + '...' : msg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Slot info */}
          <div className="p-4 bg-white rounded-2xl border border-[#f6ebf0] space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#a6354c]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f1a1e]">
                Thời gian giao hoa
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e] font-medium"
              >
                <option value="Hôm nay">Hôm nay (Giao liền)</option>
                <option value="Ngày mai">Ngày mai</option>
                <option value="Cuối tuần">Cuối tuần này</option>
                <option value="Chọn ngày khác">Chọn ngày kỷ niệm...</option>
              </select>

              <select
                value={deliveryTimeSlot}
                onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#fff7f9] border border-[#fce7e7] focus:outline-none text-[#1f1a1e] font-medium"
              >
                <option value="Giao hỏa tốc 2 giờ">Hỏa tốc 2 giờ</option>
                <option value="Sáng (08:00 - 11:30)">Sáng (08:00 - 11:30)</option>
                <option value="Chiều (13:30 - 17:00)">Chiều (13:30 - 17:00)</option>
                <option value="Tối (18:00 - 21:00)">Tối (18:00 - 21:00)</option>
              </select>
            </div>
          </div>

          {/* Product Description, Meaning & Care Guide Tabs */}
          <div className="bg-white rounded-2xl border border-[#f6ebf0] overflow-hidden">
            <div className="flex border-b border-[#f6ebf0]">
              <button
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-3 text-xs font-bold text-center transition ${
                  activeTab === 'story'
                    ? 'text-[#a6354c] border-b-2 border-[#a6354c] bg-[#fff7f9]'
                    : 'text-[#564143] hover:text-[#1f1a1e]'
                }`}
              >
                Ý nghĩa & Thiết kế
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`flex-1 py-3 text-xs font-bold text-center transition ${
                  activeTab === 'care'
                    ? 'text-[#a6354c] border-b-2 border-[#a6354c] bg-[#fff7f9]'
                    : 'text-[#564143] hover:text-[#1f1a1e]'
                }`}
              >
                Cách giữ hoa tươi lâu
              </button>
            </div>

            <div className="p-4 text-xs text-[#564143] leading-relaxed">
              {activeTab === 'story' && (
                <div className="space-y-2.5">
                  <p>{product.description}</p>
                  <div className="p-2.5 bg-[#fdf2f2] rounded-xl text-[#a6354c]">
                    <span className="font-bold">Ý nghĩa thông điệp: </span>
                    {product.meaning}
                  </div>
                  <div className="pt-2">
                    <span className="font-bold text-[#1f1a1e] block mb-1">Thành phần hoa chính:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.flowerTypes.map((flower, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#fcf1f6] text-[#861d36] rounded-md text-[10px] font-semibold">
                          {flower}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <ul className="space-y-2 list-disc list-inside text-[#564143]">
                  {product.careInstructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Fixed Action Bar */}
        <div className="p-4 bg-white border-t border-[#f6ebf0] flex items-center justify-between gap-3">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-[#fff7f9] border border-[#fce7e7] rounded-xl p-1 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg hover:bg-white text-[#564143] flex items-center justify-center transition"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#1f1a1e] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg hover:bg-white text-[#564143] flex items-center justify-center transition"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-1">
            <button
              id="btn-modal-add-to-cart"
              onClick={handleAdd}
              className="flex-1 py-3 px-3 bg-[#fdf2f2] hover:bg-[#ffb2ba]/30 text-[#a6354c] border border-[#fce7e7] text-xs font-bold rounded-xl transition active:scale-95 text-center"
            >
              Thêm vào giỏ ({formatVND(totalPrice)})
            </button>

            <button
              id="btn-modal-buy-now"
              onClick={handleInstantBuy}
              className="flex-1 py-3 px-4 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 text-center"
            >
              Đặt Giao Ngay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
