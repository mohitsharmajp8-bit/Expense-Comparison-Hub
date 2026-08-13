import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function BannerCarousel() {
  const { setSelectedCategory } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    {
      id: 1,
      tag: 'FREEDOM SALE',
      title: 'Deals on Sports Gear',
      highlight: 'Min. 40% Off',
      subtitle: 'NIVIA, Adrenex & more',
      bankOffer: 'SBI Card | 10% Instant Discount*',
      bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
      textColor: '#14532d',
      img: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80',
      category: 'Sports & Fitness'
    },
    {
      id: 2,
      tag: 'EXCLUSIVE LAUNCH',
      title: 'Samsung A36 5G',
      highlight: 'From ₹26,999',
      subtitle: 'Massive 2-day battery life • AMOLED 120Hz',
      bankOffer: 'SBI Card | 10% Instant Discount*',
      bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      textColor: '#78350f',
      img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      category: 'Mobiles'
    },
    {
      id: 3,
      tag: 'SALE IS LIVE',
      title: 'vivo T5 Pro 5G',
      highlight: 'Slimmest 9020 mAh Phone',
      subtitle: 'Sony IMX Camera • 80W FlashCharge',
      bankOffer: 'SBI Card | 10% Instant Discount*',
      bg: 'linear-gradient(135deg, #1e1b4b, #312e81)',
      textColor: '#ffffff',
      img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
      category: 'Mobiles'
    },
    {
      id: 4,
      tag: 'STREETWEAR TRENDS',
      title: 'Snitch & Premium Apparel',
      highlight: 'Flat 50% Off',
      subtitle: 'Oversized Cuban Shirts, Cargo Trousers & Jackets',
      bankOffer: 'HDFC Bank | 10% Instant Savings*',
      bg: 'linear-gradient(135deg, #fae8ff, #f5d0fe)',
      textColor: '#701a75',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      category: 'Fashion'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="banner-carousel-section">
      <div className="banner-carousel-container">
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={banner.id}
              className={`promo-banner-card ${isActive ? 'active' : ''}`}
              style={{ background: banner.bg, color: banner.textColor }}
              onClick={() => setSelectedCategory(banner.category)}
            >
              <div className="banner-badge-row">
                <span className="sale-tag"><Sparkles size={12} /> {banner.tag}</span>
                <span className="brand-logo-badge">BHARATMART CHOICE</span>
              </div>
              <div className="banner-main-content">
                <h2>{banner.title}</h2>
                <div className="banner-highlight">{banner.highlight}</div>
                <p>{banner.subtitle}</p>
                <div className="bank-offer-pill">
                  💳 <strong>{banner.bankOffer}</strong>
                </div>
              </div>
              <div className="banner-image-container">
                <img src={banner.img} alt={banner.title} className="banner-img" />
              </div>
            </div>
          );
        })}

        <button className="carousel-nav-btn prev" onClick={() => setActiveIndex((activeIndex - 1 + banners.length) % banners.length)}>
          <ChevronLeft size={20} />
        </button>
        <button className="carousel-nav-btn next" onClick={() => setActiveIndex((activeIndex + 1) % banners.length)}>
          <ChevronRight size={20} />
        </button>

        <div className="carousel-dots">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
