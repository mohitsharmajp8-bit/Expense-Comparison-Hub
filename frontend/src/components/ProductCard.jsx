import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, TrendingDown, ChevronUp, ChevronDown, ShoppingCart, Heart, Bell, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import PriceAnalysis from './PriceAnalysis';
import PlatformCompare from './PlatformCompare';
import PriceDropAlertModal from './PriceDropAlertModal';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isWishlisted = wishlist.some(w => w.id === product.id);

  // Extract brand name from product name if not explicitly set
  const brandName = product.brand || product.name.split(' ')[0];

  // Default specifications list if not explicitly attached
  const keySpecs = product.specs || [
    `Brand Warranty Included`,
    `Authentic ${product.category} Spec`,
    `Pan-India Fast Shipping`
  ];

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        layout
      >
        <div className="product-image-wrap" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image" 
            loading="lazy" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23ffffff"/><rect x="15" y="15" width="370" height="370" rx="16" fill="%23f8fafc" stroke="%23e2e8f0" stroke-width="1.5"/><circle cx="200" cy="160" r="40" fill="%23dbeafe"/><path d="M200 135 L213 155 L235 158 L218 172 L223 194 L200 182 L177 194 L182 172 L165 158 L187 155 Z" fill="%232563eb"/><text x="50%" y="240" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="15" fill="%231e293b">${encodeURIComponent(product.name)}</text><text x="50%" y="280" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="11" fill="%2394a3b8">Image updating soon from ${encodeURIComponent(brandName)}</text></svg>`;
            }}
          />
          <div className="discount-badge">{product.discount}</div>
          <div className="delivery-badge">🚀 {product.delivery}</div>
        </div>

        <div className="product-content">
          {/* Brand & Category Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span className="brand-chip">{brandName}</span>
            <span className="category-chip">{product.category}</span>
          </div>

          {/* Product Name */}
          <div className="product-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            {product.name}
          </div>

          {/* Short Factual Description */}
          <div className="product-desc">{product.desc}</div>

          {/* Key Specifications Bullet Points */}
          <div className="specs-container">
            {keySpecs.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="spec-bullet">
                <CheckCircle size={12} color="#16a34a" /> <span>{spec}</span>
              </div>
            ))}
          </div>

          {/* Rating & AI Analysis Toggle */}
          <div className="rating">
            <div className="rating-score"><Star size={12} fill="#16a34a" />{product.rating.toFixed(1)}</div>
            <div className="review-count">{product.reviews.toLocaleString()} reviews</div>
            <span className="ai-badge" onClick={(e) => { e.stopPropagation(); setShowAnalysis(!showAnalysis); }}>
              <Sparkles size={10} /> AI Advice
            </span>
          </div>

          {/* Price Row */}
          <div className="price">
            <div className="current-price">₹{product.price.toLocaleString()}</div>
            <div className="old-price">₹{product.oldPrice.toLocaleString()}</div>
            <div className="savings-tag">Save ₹{(product.oldPrice - product.price).toLocaleString()}</div>
          </div>

          {/* Price Drop Alert Trigger */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button className="price-alert-btn" onClick={() => setShowAlertModal(true)}>
              <Bell size={13} /> Set Price Alert
            </button>
          </div>

          {/* AI Analysis Collapse */}
          <AnimatePresence>
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <PriceAnalysis product={product} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compare Platform Prices Toggle */}
          <div
            className="compare-toggle-bar"
            onClick={() => setShowCompare(!showCompare)}
          >
            <TrendingDown size={14} color="#2563eb" />
            <span>{showCompare ? "Hide" : "Compare Multi-Platform Prices"}</span>
            {showCompare ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>

          {/* Multi-Platform Comparison Table Collapse */}
          <AnimatePresence>
            {showCompare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <PlatformCompare product={product} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Buttons */}
          <div className="card-buttons">
            <button className="add-btn" onClick={() => { addToCart(product); toast.success(`${product.name} added to cart! 🛒`); }}>
              <ShoppingCart size={16} style={{ display: 'inline', marginRight: 6 }} />{t('addToCart')}
            </button>
            <button className="wishlist-btn" onClick={() => toggleWishlist(product)} style={{ color: isWishlisted ? '#ff3859' : '#94a3b8' }}>
              <Heart size={18} fill={isWishlisted ? '#ff3859' : 'none'} color={isWishlisted ? '#ff3859' : '#94a3b8'} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Price Drop Alert Modal */}
      {showAlertModal && (
        <PriceDropAlertModal product={product} onClose={() => setShowAlertModal(false)} />
      )}
    </>
  );
}
