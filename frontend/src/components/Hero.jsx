import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import products from '../data/products';

export default function Hero() {
  const navigate = useNavigate();
  const adProduct = products.find(p => p.id === 5) || products[0];

  return (
    <section className="hero">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-tag"><Zap size={14} /> Live Price Comparison</div>
        <h1>India's Best<br /><span>Price Compare</span><br />Engine 🔥</h1>
        <p>Compare prices across Amazon, Flipkart, Zepto, Blinkit, BigBasket & Swiggy Instamart instantly. Liquid smooth.</p>
        <div className="hero-stats">
          <div className="hero-stat"><strong>6+</strong><span>Platforms</span></div>
          <div className="hero-stat"><strong>160+</strong><span>Products</span></div>
          <div className="hero-stat"><strong>₹500Cr+</strong><span>Saved</span></div>
        </div>
        <button onClick={() => navigate('/')}>Shop & Save Now →</button>
      </div>
      <div className="hero-banner" onClick={() => navigate(`/product/${adProduct.id}`)} style={{ cursor: 'pointer' }}>
        <div className="ad-badge">AD</div>
        <div className="banner-image" style={{ 
          height: '100%', 
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${adProduct.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '18px'
        }}>
          <div className="banner-text">
            <div className="ad-title" style={{ color: 'white', fontWeight: 900 }}>{adProduct.name}</div>
            <div className="ad-sub" style={{ color: '#e2e8f0' }}>From ₹{adProduct.price.toLocaleString()} • Leica Optics • Compare Now</div>
          </div>
        </div>
      </div>
    </section>
  );
}
