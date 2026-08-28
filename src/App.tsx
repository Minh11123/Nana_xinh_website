import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CuratedOccasions } from './components/CuratedOccasions';
import { FeatureHighlights } from './components/FeatureHighlights';
import { SignatureBouquets } from './components/SignatureBouquets';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShopCatalogScreen } from './components/ShopCatalogScreen';
import { CustomDesignStudio } from './components/CustomDesignStudio';
import { AIFloristModal } from './components/AIFloristModal';
import { ZaloChatModal } from './components/ZaloChatModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { UserProfileModal } from './components/UserProfileModal';
import { SidebarMenu } from './components/SidebarMenu';
import { FlowerCareModal } from './components/FlowerCareModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { OurStoryModal } from './components/OurStoryModal';
import { ContactModal } from './components/ContactModal';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { PRODUCTS, OCCASIONS } from './data/flowerData';
import { FlowerProduct, CartItem, Order, GreetingCard } from './types';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'cart' | 'zalo'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Frame mode toggle: Desktop Boutique (default as requested) vs Mobile simulator frame
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Cart State (Initialized with 2 items matching "Giỏ (2)" in screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-item-1',
      product: PRODUCTS[0], // Cẩm Tú Cầu
      quantity: 1,
      size: 'standard',
      sizeMultiplier: 1.0,
      includeVase: false,
      vasePrice: 85000,
      deliveryDate: 'Hôm nay (2 giờ)',
      deliveryTimeSlot: '14:00 - 16:00',
      card: {
        to: 'Ngọc Mai',
        from: 'Minh',
        message: 'Chúc mừng ngày đặc biệt! Chúc em luôn xinh đẹp, rạng rỡ và hạnh phúc!',
        theme: 'vintage-rose',
        occasion: 'romantic',
      },
    },
    {
      id: 'init-item-2',
      product: PRODUCTS[2], // Baby Pink
      quantity: 1,
      size: 'standard',
      sizeMultiplier: 1.0,
      includeVase: true,
      vasePrice: 85000,
      deliveryDate: 'Hôm nay (2 giờ)',
      deliveryTimeSlot: '14:00 - 16:00',
    },
  ]);

  // Wishlist State (Initialized with Baby Pink matching the screenshot)
  const [wishlistIds, setWishlistIds] = useState<string[]>(['baby-pink']);

  // Orders history
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCustomStudioOpen, setIsCustomStudioOpen] = useState<boolean>(false);
  const [isAiFloristOpen, setIsAiFloristOpen] = useState<boolean>(false);
  const [isZaloChatOpen, setIsZaloChatOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isOurStoryOpen, setIsOurStoryOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: FlowerProduct) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds(wishlistIds.filter((id) => id !== product.id));
      showToast(`Đã bỏ lưu "${product.name}"`);
    } else {
      setWishlistIds([...wishlistIds, product.id]);
      showToast(`Đã thêm "${product.name}" vào mục Yêu Thích 🌸`);
    }
  };

  // Add to Cart
  const handleAddToCart = (
    product: FlowerProduct,
    quantity: number,
    size: 'standard' | 'deluxe' | 'grandeur',
    card?: GreetingCard,
    includeVase: boolean = false,
    deliveryDate: string = 'Hôm nay',
    deliveryTimeSlot: string = 'Giao hỏa tốc 2 giờ',
    specialNotes?: string
  ) => {
    const sizeMultiplier = size === 'standard' ? 1.0 : size === 'deluxe' ? 1.3 : 1.6;
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      quantity,
      size,
      sizeMultiplier,
      card,
      includeVase,
      vasePrice: 85000,
      deliveryDate,
      deliveryTimeSlot,
      specialNotes,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng ✨`);
  };

  // Quick (+) add from cards
  const handleQuickAddToCart = (product: FlowerProduct) => {
    handleAddToCart(product, 1, 'standard');
  };

  // Buy Now instant checkout
  const handleBuyNow = (
    product: FlowerProduct,
    quantity: number,
    size: 'standard' | 'deluxe' | 'grandeur',
    card?: GreetingCard,
    includeVase: boolean = false,
    deliveryDate?: string,
    deliveryTimeSlot?: string
  ) => {
    handleAddToCart(product, quantity, size, card, includeVase, deliveryDate, deliveryTimeSlot);
    setIsCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove from Cart
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  // Navigation Tab Change
  const handleTabChange = (tab: 'home' | 'shop' | 'cart' | 'zalo') => {
    if (tab === 'cart') {
      setIsCartOpen(true);
      return;
    }
    if (tab === 'zalo') {
      setIsZaloChatOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  // Curated Occasion Click
  const handleOccasionClick = (occasionId: string) => {
    if (occasionId === 'custom') {
      setIsCustomStudioOpen(true);
    } else {
      setSelectedCategory(occasionId);
      setActiveTab('shop');
    }
  };

  // Filtered Signature Products (take 4 matching screenshot)
  const signatureProducts = PRODUCTS.slice(0, 4);

  // Wishlisted products list
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#fff7f9] flex flex-col items-center selection:bg-[#ee6c81]/20">
      
      {/* Top Device View Mode Switcher for convenience */}
      <div className="w-full bg-[#352f33] text-[#f9eef3] py-1.5 px-4 text-xs flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="font-semibold hidden sm:inline">Nana Xinh Florist Experience:</span>
          <span className="text-[11px] bg-[#a6354c] px-2 py-0.5 rounded-full text-white font-bold">
            Live Preview
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrame(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
              !isMobileFrame ? 'bg-[#a6354c] text-white font-bold' : 'hover:bg-white/10 text-neutral-300'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Boutique</span>
          </button>
          <button
            onClick={() => setIsMobileFrame(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
              isMobileFrame ? 'bg-[#a6354c] text-white font-bold' : 'hover:bg-white/10 text-neutral-300'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App Frame</span>
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[430px] my-0 sm:my-4 sm:rounded-[38px] shadow-2xl overflow-hidden border border-[#e2d7dc] bg-[#fff7f9] relative min-h-[850px]'
            : 'w-full px-0'
        }`}
      >
        {/* Header Bar */}
        <Header
          cartCount={cartItems.length}
          wishlistCount={wishlistIds.length}
          activeNav={activeTab}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenSearch={() => {
            setActiveTab('shop');
          }}
          onOpenAiFlorist={() => setIsAiFloristOpen(true)}
          onNavigateHome={() => {
            setSelectedCategory('all');
            setActiveTab('home');
          }}
          onNavigateShop={(cat) => {
            if (cat) setSelectedCategory(cat);
            setActiveTab('shop');
          }}
          onOpenOurStory={() => setIsOurStoryOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Content View */}
        <main className="w-full">
          {activeTab === 'home' ? (
            <div className="animate-fade-in">
              {/* 1. Hero Banner (Split 2-col desktop layout per screenshot) */}
              <HeroBanner
                onShopCollection={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
                onOpenStoryModal={() => setIsStoryModalOpen(true)}
                onOccasionClick={handleOccasionClick}
              />

              {/* 2. Curated Occasions (4-Column Cards matching screenshot) */}
              <CuratedOccasions
                onSelectOccasion={handleOccasionClick}
                onViewAll={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />

              {/* 3. Signature Bouquets (4-Column with Add to Cart matching screenshot) */}
              <SignatureBouquets
                products={signatureProducts}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAddToCart={handleQuickAddToCart}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onViewAllCatalog={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />

              {/* 4. Feature Highlights (Farm Fresh, Same Day Delivery, Artisan Crafted) */}
              <FeatureHighlights />

              {/* 5. Customer Testimonials & Reviews */}
              <CustomerReviewsSection />
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Full Shop Catalog Screen */}
              <ShopCatalogScreen
                products={PRODUCTS}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAddToCart={handleQuickAddToCart}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
              />
            </div>
          )}
        </main>

        {/* Desktop & Mobile Footer matching screenshot */}
        <Footer
          onNavigateHome={() => {
            setSelectedCategory('all');
            setActiveTab('home');
          }}
          onNavigateShop={() => {
            setSelectedCategory('all');
            setActiveTab('shop');
          }}
          onOpenOurStory={() => setIsOurStoryOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenCareGuide={() => setIsCareGuideOpen(true)}
        />

        {/* Bottom Floating Navigation on mobile frame */}
        {isMobileFrame && (
          <BottomNav
            activeTab={activeTab}
            cartCount={cartItems.length}
            onTabChange={handleTabChange}
          />
        )}
      </div>

      {/* Modals and Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onStartShopping={() => {
          setIsCartOpen(false);
          setActiveTab('shop');
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={(newOrder) => {
          setOrders([newOrder, ...orders]);
          setCartItems([]);
        }}
      />

      <CustomDesignStudio
        isOpen={isCustomStudioOpen}
        onClose={() => setIsCustomStudioOpen(false)}
        onAddCustomProductToCart={(customProd, notes) => {
          handleAddToCart(customProd, 1, 'standard', undefined, false, 'Hôm nay', 'Giao hỏa tốc 2 giờ', notes);
          setIsCartOpen(true);
        }}
      />

      <AIFloristModal
        isOpen={isAiFloristOpen}
        onClose={() => setIsAiFloristOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <ZaloChatModal
        isOpen={isZaloChatOpen}
        onClose={() => setIsZaloChatOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickAddToCart={handleQuickAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
      />

      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={() => {
          setSelectedCategory('all');
          setActiveTab('home');
        }}
        onNavigateShop={(cat) => {
          if (cat) setSelectedCategory(cat);
          setActiveTab('shop');
        }}
        onOpenCustomStudio={() => setIsCustomStudioOpen(true)}
        onOpenAiFlorist={() => setIsAiFloristOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      <FlowerCareModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      <StoryDetailModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onShopCollection={() => {
          setSelectedCategory('all');
          setActiveTab('shop');
        }}
      />

      <OurStoryModal
        isOpen={isOurStoryOpen}
        onClose={() => setIsOurStoryOpen(false)}
        onShopCollection={() => {
          setSelectedCategory('all');
          setActiveTab('shop');
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenZaloChat={() => setIsZaloChatOpen(true)}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 bg-[#1f1a1e] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl z-50 animate-bounce flex items-center gap-2 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#ee6c81]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
