import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Sparkles, ShoppingBag } from 'lucide-react';

interface StoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopCollection: () => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  isOpen,
  onClose,
  onShopCollection,
}) => {
  if (!isOpen) return null;

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { author: 'Thu Trang', text: 'Mẫu hoa này đẹp quá shop ơi, hoa nở to thơm ngát!', time: '10 phút trước' },
    { author: 'Quốc Bảo', text: 'Vừa đặt tặng sinh nhật bạn gái hôm qua, giao đúng giờ và thiệp viết nắn nót lắm ❤️', time: '1 giờ trước' },
    { author: 'Hồng Nhung', text: 'Tone màu cẩm tú cầu phối hồng dâu cực kỳ tinh tế luôn', time: '3 giờ trước' },
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setComments([
      { author: 'Bạn', text: commentText, time: 'Vừa xong' },
      ...comments,
    ]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#fce7e7]">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#f6ebf0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#ee6c81] to-[#a6354c]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="Nana Xinh"
                className="w-full h-full rounded-full object-cover border border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-bold text-xs text-[#1f1a1e] block">trangchủ · Nana Xinh</span>
              <span className="text-[10px] text-[#8a7173]">Khoảnh khắc xưởng hoa</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#fcf1f6] text-[#564143] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media & Comments */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"
              alt="Floral moment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <h3 className="font-serif text-base font-bold drop-shadow-sm">
                Trao gửi yêu thương qua từng cánh hoa
              </h3>
              <p className="text-xs text-rose-100 mt-0.5">
                Mỗi buổi sáng tại Nana Xinh là một hành trình sáng tạo những đoá hoa thơm ngát.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onShopCollection();
            }}
            className="w-full py-2.5 bg-[#a6354c] hover:bg-[#861d36] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Xem Các Mẫu Trong Bài Viết</span>
          </button>

          {/* Comments list */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-[#1f1a1e] block">
              Bình luận ({comments.length})
            </span>
            <div className="space-y-2.5">
              {comments.map((c, i) => (
                <div key={i} className="p-2.5 bg-[#fff7f9] rounded-xl border border-[#fce7e7] text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#1f1a1e]">{c.author}</span>
                    <span className="text-[10px] text-[#8a7173]">{c.time}</span>
                  </div>
                  <p className="text-[#564143]">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment input bar */}
        <form onSubmit={handleAddComment} className="p-3 bg-white border-t border-[#f6ebf0] flex gap-2">
          <input
            type="text"
            placeholder="Viết cảm nghĩ về bó hoa này..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#fff7f9] border border-[#fce7e7] focus:outline-none focus:border-[#a6354c]"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="px-4 py-2 bg-[#a6354c] hover:bg-[#861d36] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition"
          >
            Gửi
          </button>
        </form>

      </div>
    </div>
  );
};
