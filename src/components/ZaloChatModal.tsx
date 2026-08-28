import React, { useState } from 'react';
import { X, Send, PhoneCall, Sparkles, CheckCheck, Clock, Image as ImageIcon } from 'lucide-react';

interface ZaloChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  image?: string;
}

export const ZaloChatModal: React.FC<ZaloChatModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Chào bạn! Tiệm hoa Nana Xinh xin nghe. Bạn đang cần tư vấn hoa tặng người thương, hoa sinh nhật hay sự kiện đặc biệt nào ạ?',
      time: 'Vừa xong',
    },
  ]);

  const quickQuestions = [
    '🌸 Gửi ảnh hoa thực tế hôm nay',
    '⚡ Giao hoa hỏa tốc trong 2h có kịp không?',
    '💌 Có tặng kèm thiệp viết tay không?',
    '💐 Tư vấn mẫu hoa sinh nhật dưới 700k',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Simulate florist assistant response
    setTimeout(() => {
      let replyText = 'Dạ Nana Xinh đã nhận được tin nhắn! Florist đang chụp ảnh hoa thực tế tại xưởng và gửi cho bạn ngay trong 2-3 phút nhé ạ.';
      if (text.includes('2h') || text.includes('hỏa tốc')) {
        replyText = 'Dạ bên em cam kết giao hỏa tốc trong 2h tại khu vực nội thành TP.HCM & Hà Nội ạ! Hoa luôn được bảo quản mát và chụp ảnh gửi bạn duyệt trước khi shipper lên đường.';
      } else if (text.includes('thiệp')) {
        replyText = 'Dạ tất cả các đơn hoa tại Nana Xinh đều được MIỄN PHÍ thiệp nghệ thuật viết tay theo nội dung bạn yêu cầu + tặng kèm gói dưỡng hoa Chrysal cao cấp ạ!';
      } else if (text.includes('700k') || text.includes('sinh nhật')) {
        replyText = 'Dạ với mức ngân sách này, Nana Xinh gợi ý bạn 2 mẫu best-seller cực xinh là "Cẩm Tú Cầu Mix" (550.000đ) và "Dâu Ngọt Pink Roses" (620.000đ) bạn nha!';
      }

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: 'Vừa xong',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg h-[92vh] sm:h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Zalo Header Bar */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#0068FF] to-[#008fe5] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  alt="Florist Nana"
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">Nana Xinh Florist</h3>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-medium">
                  Official Zalo
                </span>
              </div>
              <span className="text-[11px] text-blue-100 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Đang hoạt động · Phản hồi trong 1 phút
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:0908123456"
              className="p-2 rounded-full hover:bg-white/20 text-white transition"
              title="Gọi hotline"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition"
              aria-label="Đóng chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f4f7fa]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0068FF] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-[#1f1a1e] rounded-tl-xs shadow-2xs border border-neutral-200/60'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-[#8a7173]'
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fast Questions Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-3 py-1.5 bg-[#f0f5ff] text-[#0068FF] font-medium rounded-full whitespace-nowrap hover:bg-[#e1ecff] transition shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập tin nhắn tư vấn với tiệm hoa..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 px-4 py-2.5 bg-[#f4f7fa] text-xs text-[#1f1a1e] rounded-full focus:outline-none focus:ring-1 focus:ring-[#0068FF]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputMessage.trim()}
            className="w-10 h-10 rounded-full bg-[#0068FF] hover:bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
