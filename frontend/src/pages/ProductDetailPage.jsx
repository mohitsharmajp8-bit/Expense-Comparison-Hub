import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Bell, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useApp } from '../contexts/AppContext';
import products from '../data/products';
import PriceAnalysis from '../components/PriceAnalysis';
import PlatformCompare from '../components/PlatformCompare';
import PriceDropAlertModal from '../components/PriceDropAlertModal';

import ProductImageGallery from '../components/ProductImageGallery';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);

  if (!product) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 48 }}>😕</div>
      <div style={{ fontSize: 24, fontWeight: 800, marginTop: 16 }}>Product not found</div>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: 24, padding: '12px 24px', background: '#ff3859', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}
      >
        Go Home
      </button>
    </div>
  );

  const isWishlisted = wishlist.some(w => w.id === product.id);
  const brandName = product.brand || product.name.split(' ')[0];

  const keySpecs = product.specs || [
    `Official ${brandName} Brand Warranty Included`,
    `Authentic ${product.category} Specifications`,
    `GST Invoice & Pan-India Express Delivery`,
    `7-Day Easy Replacement Policy`
  ];

  return (
    <div className="page">
      <button 
        onClick={() => navigate(-1)} 
        className="back-nav-btn"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>
      
      <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 36, alignItems: 'start' }}>
        <div>
          <ProductImageGallery product={product} />
        </div>

        <div>
          <div className="glass-panel" style={{ padding: 32 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <span className="brand-chip" style={{ fontSize: 12, padding: '4px 12px' }}>{brandName}</span>
              <span className="category-chip" style={{ fontSize: 12, padding: '4px 12px' }}>{product.category}</span>
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, marginTop: 0, lineHeight: 1.2 }}>{product.name}</h1>
            
            <p style={{ color: '#475569', marginBottom: 20, lineHeight: 1.6, fontSize: 15 }}>{product.desc}</p>

            {/* Key Specifications Bullet Points */}
            <div className="detail-specs-box" style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={16} color="#2563eb" /> Key Specifications & Highlights
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {keySpecs.map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569', fontWeight: 600 }}>
                    <CheckCircle size={14} color="#16a34a" /> <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rating" style={{ marginBottom: 20 }}>
              <div className="rating-score" style={{ fontSize: 14, padding: '6px 12px' }}><Star size={16} fill="#16a34a" />{product.rating.toFixed(1)}</div>
              <div className="review-count" style={{ fontSize: 14 }}>{product.reviews.toLocaleString()} verified customer reviews</div>
            </div>

            <div className="price" style={{ marginBottom: 24 }}>
              <div className="current-price" style={{ fontSize: 32 }}>₹{product.price.toLocaleString()}</div>
              <div className="old-price" style={{ fontSize: 18 }}>₹{product.oldPrice.toLocaleString()}</div>
              <div className="savings-tag" style={{ fontSize: 13, padding: '6px 14px' }}>Save ₹{(product.oldPrice - product.price).toLocaleString()}</div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button className="add-btn" style={{ flex: 2, padding: 16, fontSize: 16 }} onClick={() => { addToCart(product); toast.success('Added to cart! 🛒'); }}>
                <ShoppingCart size={18} style={{ display: 'inline', marginRight: 8 }} /> Add To Cart
              </button>
              <button className="price-alert-btn" style={{ flex: 1.5, padding: 16 }} onClick={() => setShowAlertModal(true)}>
                <Bell size={16} /> Price Alert
              </button>
              <button className="wishlist-btn" style={{ width: 56, height: 56 }} onClick={() => toggleWishlist(product)}>
                <Heart size={20} fill={isWishlisted ? '#ff3859' : 'none'} color={isWishlisted ? '#ff3859' : '#94a3b8'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Comparison Table & AI Price Analysis */}
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28 }} className="seller-charts-grid">
        <PlatformCompare product={product} />
        <PriceAnalysis product={product} />
      </div>

      {showAlertModal && (
        <PriceDropAlertModal product={product} onClose={() => setShowAlertModal(false)} />
      )}
    </div>
  );
}
