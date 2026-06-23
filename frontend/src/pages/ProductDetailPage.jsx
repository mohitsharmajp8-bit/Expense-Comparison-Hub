import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useApp } from '../contexts/AppContext';
import products from '../data/products';
import PriceAnalysis from '../components/PriceAnalysis';
import PlatformCompare from '../components/PlatformCompare';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const navigate = useNavigate();
  const isWishlisted = wishlist.some(w => w.id === product?.id);

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

  return (
    <div className="page">
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: 20, padding: '10px 20px', background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 12, cursor: 'pointer', fontWeight: 700, backdropFilter: 'blur(8px)' }}
      >
        ← Back
      </button>
      
      <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: 24, objectFit: 'cover', height: 400 }} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><rect x="10" y="10" width="180" height="180" rx="12" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1.5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2394a3b8">BharatMart</text></svg>';
            }}
          />
        </div>
        <div>
          <div className="glass-panel" style={{ padding: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#ff3859', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>
              {product.category}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, marginTop: 0 }}>{product.name}</h1>
            <p style={{ color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>{product.desc}</p>
            <div className="rating" style={{ marginBottom: 16 }}>
              <div className="rating-score"><Star size={14} fill="#16a34a" />{product.rating.toFixed(1)}</div>
              <div className="review-count">{product.reviews.toLocaleString()} reviews</div>
            </div>
            <div className="price" style={{ marginBottom: 20 }}>
              <div className="current-price">₹{product.price.toLocaleString()}</div>
              <div className="old-price">₹{product.oldPrice.toLocaleString()}</div>
              <div className="savings-tag">{product.discount}</div>
            </div>
            <div className="offer-tags" style={{ marginBottom: 20 }}>
              {product.offers.map(o => <span key={o} className="offer">{o}</span>)}
            </div>
            <div className="card-buttons">
              <button className="add-btn" onClick={() => { addToCart(product); toast.success('Added to cart! 🛒'); }}>
                <ShoppingCart size={16} style={{ display: 'inline', marginRight: 8 }} /> Add To Cart
              </button>
              <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                <Heart size={18} fill={isWishlisted ? '#ff3859' : 'none'} color={isWishlisted ? '#ff3859' : '#94a3b8'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="seller-charts-grid">
        <PriceAnalysis product={product} />
        <PlatformCompare product={product} />
      </div>
    </div>
  );
}
