import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ShoppingCart, Heart, Package, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function BottomNav() {
  const { cart } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const nav = [
    { icon: <HomeIcon size={22} />, label: t('categories'), path: '/' },
    { icon: <ShoppingCart size={22} />, label: t('cart'), path: '/cart', badge: cart.reduce((a, c) => a + (c.quantity || 1), 0) },
    { icon: <Heart size={22} />, label: t('wishlist'), path: '/wishlist' },
    { icon: <Package size={22} />, label: t('orders'), path: '/orders' },
    { icon: <User size={22} />, label: t('profile'), path: '/profile' },
  ];

  return (
    <div className="bottom-nav">
      {nav.map(item => (
        <div
          key={item.path}
          className={`bottom-item ${location.pathname === item.path ? 'active' : ''}`}
          style={{ color: location.pathname === item.path ? '#ff3859' : '#64748b', position: 'relative' }}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          {item.badge > 0 && <div className="cart-badge" style={{ top: -8, right: -8 }}>{item.badge}</div>}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
