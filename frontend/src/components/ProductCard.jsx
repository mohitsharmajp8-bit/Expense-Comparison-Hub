import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, TrendingDown, ChevronUp, ChevronDown, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import PriceAnalysis from './PriceAnalysis';
import PlatformCompare from './PlatformCompare';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const isWishlisted = wishlist.some(w => w.id === product.id);

  return (
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
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><rect x="10" y="10" width="180" height="180" rx="12" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1.5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2394a3b8">BharatMart</text></svg>';
          }}
        />
        <div className="discount-badge">{product.discount}</div>
        <div className="delivery-badge">🚀 {product.delivery}</div>
      </div>
      <div className="product-content">
        <div className="product-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
          {product.name}
        </div>
        <div className="product-desc">{product.desc}</div>
        <div className="rating">
          <div className="rating-score"><Star size={12} fill="#16a34a" />{product.rating.toFixed(1)}</div>
          <div className="review-count">{product.reviews.toLocaleString()} reviews</div>
          <span className="ai-badge" onClick={(e) => { e.stopPropagation(); setShowAnalysis(!showAnalysis); }}>
            <Sparkles size={10} /> AI Analysis
          </span>
        </div>
        <div className="price">
          <div className="current-price">₹{product.price.toLocaleString()}</div>
          <div className="old-price">₹{product.oldPrice.toLocaleString()}</div>
          <div className="savings-tag">Save ₹{(product.oldPrice - product.price).toLocaleString()}</div>
        </div>
        <div className="offer-tags">
          {product.offers.map(o => <span key={o} className="offer">{o}</span>)}
        </div>

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

        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#64748b' }}
          onClick={() => setShowCompare(!showCompare)}
        >
          <TrendingDown size={14} color="#ff3859" />
          {showCompare ? "Hide" : "Compare"} Platform Prices
          {showCompare ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
        
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
  );
}
