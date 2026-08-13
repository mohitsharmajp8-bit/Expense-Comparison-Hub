import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Bell, Heart, User, ShoppingCart, ChevronDown, PackageCheck, Store, HelpCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { cart, darkMode, setDarkMode, setSearch, setSelectedCategory, notifications, setShowNotif, showNotif, markAllNotificationsAsRead, user, logout } = useApp();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setSearch(val);
    setSelectedCategory('All');
  };

  const totalCartCount = cart.reduce((a, c) => a + (c.quantity || 1), 0);
  const userName = user ? user.name.split(' ')[0] : 'Mohit';

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo" onClick={() => { navigate('/'); setSearch(''); setSearchTerm(''); setSelectedCategory('All'); }}>
          {t('appName')}
        </div>

        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            className="search-input"
            placeholder="Search for Products, Brands and More"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="nav-icons">
          {/* User Profile Dropdown */}
          <div className="profile-dropdown-container">
            <button className="nav-dropdown-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <User size={18} />
              <span>{userName}</span>
              <ChevronDown size={14} />
            </button>
            {showProfileMenu && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-item" onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}>
                  <User size={16} /> My Profile
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/orders'); setShowProfileMenu(false); }}>
                  <PackageCheck size={16} /> Orders
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/wishlist'); setShowProfileMenu(false); }}>
                  <Heart size={16} /> Wishlist
                </div>
                {user && (
                  <div className="dropdown-item logout" onClick={() => { logout(); setShowProfileMenu(false); }}>
                    Logout
                  </div>
                )}
              </div>
            )}
          </div>

          {/* More Menu Dropdown */}
          <div className="profile-dropdown-container">
            <button className="nav-dropdown-btn" onClick={() => setShowMoreMenu(!showMoreMenu)}>
              <span>More</span>
              <ChevronDown size={14} />
            </button>
            {showMoreMenu && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-item" onClick={() => { navigate('/seller'); setShowMoreMenu(false); }}>
                  <Store size={16} /> Seller Hub
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/wishlist'); setShowMoreMenu(false); }}>
                  <Heart size={16} /> Saved Items
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/profile'); setShowMoreMenu(false); }}>
                  <HelpCircle size={16} /> 24x7 Customer Care
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
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

          {/* Dark mode & Language */}
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

          {/* Cart Button */}
          <div className="cart-nav-btn" onClick={() => navigate('/cart')}>
            <ShoppingCart size={20} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <div className="cart-badge-count">{totalCartCount}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
