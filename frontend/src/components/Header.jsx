import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Bell, Heart, User, ShoppingCart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { cart, darkMode, setDarkMode, setSearch, setSelectedCategory, notifications, setShowNotif, showNotif, markAllNotificationsAsRead } = useApp();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setSearch(val);
    setSelectedCategory('All');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo" onClick={() => { navigate('/'); setSearch(''); setSearchTerm(''); setSelectedCategory('All'); }}>
          {t('appName')}
        </div>
        <div className="search-box">
          <input
            className="search-input"
            placeholder={t('search')}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="search-icon" size={20} />
        </div>
        <div className="nav-icons">
          <div className={`toggle-switch ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
            <div className="toggle-knob">
              {darkMode ? <Sun size={14} color="#ff6a00" /> : <Moon size={14} color="#6b7280" />}
            </div>
          </div>
          <select value={lang} onChange={e => setLang(e.target.value)} className="lang-select">
            <option value="en">🇬🇧 EN</option>
            <option value="hi">🇮🇳 HI</option>
            <option value="kn">🇮🇳 KN</option>
          </select>
          <div className="icon-btn" onClick={() => {
            setShowNotif(!showNotif);
            if (!showNotif) {
              markAllNotificationsAsRead();
            }
          }} style={{ position: 'relative' }}>
            <Bell size={18} />
            {notifications.filter(n => n.unread).length > 0 && (
              <div className="cart-badge" style={{ background: '#8b5cf6' }}>
                {notifications.filter(n => n.unread).length}
              </div>
            )}
          </div>
          <div className="icon-btn" onClick={() => navigate('/wishlist')}><Heart size={18} /></div>
          <div className="icon-btn" onClick={() => navigate('/profile')}><User size={18} /></div>
          <div className="icon-btn" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <div className="cart-badge">
                {cart.reduce((a, c) => a + (c.quantity || 1), 0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
