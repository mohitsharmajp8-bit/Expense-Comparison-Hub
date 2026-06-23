import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (wishlist.length === 0) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>💔</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>Your wishlist is empty</div>
      <div style={{ color: '#94a3b8', marginTop: 8, marginBottom: 24 }}>Save products you love!</div>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 16 }}
      >
        Explore Products →
      </button>
    </div>
  );

  return (
    <div className="page">
      <h1 className="page-title">❤️ {t('wishlist')}</h1>
      <div className="product-grid">
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
