import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, X, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import SellerDashboard from '../components/SellerDashboard';
import LoginPage from './LoginPage';
import API from '../services/api';

const readStorage = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { wishlist } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const { data } = await API.get('/orders');
        setOrders(data);
      } catch (err) {
        console.warn('Failed to fetch orders for profile stats', err);
      }
    }
    fetchOrders();
  }, [user]);
  
  const [addresses, setAddresses] = useState(() => readStorage('bm_addresses', [
    { id: 1, type: 'Home 🏠', addr: '42, MG Road, Koramangala, Bengaluru - 560034', default: true },
    { id: 2, type: 'Office 🏢', addr: 'No 1, Whitefield Main Road, Bengaluru - 560066', default: false },
  ]));

  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({ id: null, type: 'Home 🏠', addr: '', default: false });
  const [isSeller, setIsSeller] = useState(() => readStorage('bm_is_seller', false));

  useEffect(() => {
    writeStorage('bm_addresses', addresses);
  }, [addresses]);

  useEffect(() => {
    writeStorage('bm_is_seller', isSeller);
  }, [isSeller]);

  if (!user) return (
    <div className="page">
      <LoginPage />
    </div>
  );

  const tabs = ['profile', 'addresses', 'seller'];

  const handleOpenAdd = () => {
    setModalForm({ id: null, type: 'Home 🏠', addr: '', default: false });
    setShowModal(true);
  };

  const handleOpenEdit = (a) => {
    setModalForm(a);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      // Ensure at least one default if we deleted the default one
      if (filtered.length > 0 && !filtered.some(a => a.default)) {
        filtered[0].default = true;
      }
      return filtered;
    });
    toast.info('Address removed');
  };

  const handleSave = () => {
    if (!modalForm.addr.trim()) {
      toast.error('Address field cannot be empty');
      return;
    }

    setAddresses(prev => {
      let updated = [];
      if (modalForm.id === null) {
        // Create
        const newAddr = {
          ...modalForm,
          id: Date.now(),
          default: modalForm.default || prev.length === 0
        };
        updated = [...prev, newAddr];
      } else {
        // Update
        updated = prev.map(a => a.id === modalForm.id ? modalForm : a);
      }

      // If default is true, reset other defaults
      if (modalForm.default) {
        updated = updated.map(a => a.id === modalForm.id || (modalForm.id === null && a.id === updated[updated.length - 1].id) ? a : { ...a, default: false });
      }

      return updated;
    });

    setShowModal(false);
    toast.success(modalForm.id === null ? 'Address added!' : 'Address updated!');
  };

  return (
    <div className="page">
      <h1 className="page-title">👤 {t('profile')}</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            style={{ 
              padding: '10px 20px', 
              borderRadius: 12, 
              border: '1px solid rgba(255,255,255,0.4)', 
              background: activeTab === tab ? 'linear-gradient(135deg,#ff3859,#ff9800)' : 'rgba(255,255,255,0.3)', 
              color: activeTab === tab ? 'white' : 'inherit', 
              cursor: 'pointer', 
              fontWeight: 700, 
              backdropFilter: 'blur(8px)' 
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="profile-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: 50, background: 'linear-gradient(135deg,#ff3859,#ff9800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>👤</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{user.name}</div>
              <div style={{ color: '#94a3b8' }}>{user.email}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: '#16a34a', fontWeight: 700, background: 'rgba(34,197,94,0.1)', padding: '3px 10px', borderRadius: 999, display: 'inline-block', border: '1px solid rgba(34,197,94,0.2)' }}>✓ Verified Account</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="seller-metrics-grid">
            {(() => {
              const totalSaved = orders.reduce((sum, order) => {
                let items = [];
                try {
                  items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                } catch (e) {
                  items = [];
                }
                if (!Array.isArray(items)) return sum;
                return sum + items.reduce((s, item) => {
                  const price = parseFloat(item.price) || 0;
                  const oldPrice = parseFloat(item.oldPrice || item.old_price) || price;
                  const qty = parseInt(item.quantity) || 1;
                  return s + Math.max(0, oldPrice - price) * qty;
                }, 0);
              }, 0);

              const stats = [
                { label: 'Total Orders', value: orders.length.toString(), icon: '📦' },
                { label: 'Total Saved', value: `₹${totalSaved.toLocaleString()}`, icon: '💰' },
                { label: 'Wishlist Items', value: wishlist.length.toString(), icon: '❤️' },
                { label: 'Reviews Given', value: '0', icon: '⭐' },
              ];

              return stats.map(stat => (
                <div key={stat.label} style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.4)', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#ff3859' }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ));
            })()}
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); toast.info('Logged out successfully'); }} 
            style={{ marginTop: 24, padding: '14px 28px', background: 'rgba(255,56,89,0.1)', border: '1px solid rgba(255,56,89,0.3)', borderRadius: 16, cursor: 'pointer', color: '#ff3859', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <LogOut size={18} /> {t('logout')}
          </button>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div>
          {addresses.map((a) => (
            <div key={a.id} className="address-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{a.type}</div>
                  <div style={{ color: '#64748b', lineHeight: 1.6 }}>{a.addr}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {a.default && (
                    <span style={{ fontSize: 12, background: 'rgba(34,197,94,0.1)', color: '#16a34a', padding: '4px 10px', borderRadius: 999, fontWeight: 700, border: '1px solid rgba(34,197,94,0.2)' }}>
                      Default
                    </span>
                  )}
                  <button 
                    onClick={() => handleOpenEdit(a)}
                    style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: 12 }}
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(a.id)}
                    style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#ef4444', fontWeight: 600, fontSize: 12 }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={handleOpenAdd}
            style={{ padding: '14px 24px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 15, marginTop: 8 }}
          >
            + Add New Address
          </button>
        </div>
      )}

      {activeTab === 'seller' && (
        isSeller ? (
          <SellerDashboard />
        ) : (
          <div className="glass-panel" style={{ padding: 36, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12, marginTop: 0 }}>
              Become a Seller on BharatMart!
            </h2>
            <p style={{ color: '#64748b', marginBottom: 24, lineHeight: 1.6, maxWidth: 500, margin: '0 auto 24px' }}>
              Join thousands of merchants selling their products directly on BharatMart.
              Gain access to live metrics, real-time inventory tracking, and visual sales statistics.
            </p>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, textAlign: 'left', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <span>📈</span> Live Revenue & Category Mix Charts
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <span>📦</span> Easy Stock & Inventory Management
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <span>💰</span> Zero Listing Fees & Quick Approvals
              </div>
            </div>
            <br />
            <button
              onClick={() => {
                setIsSeller(true);
                toast.success('Congratulations! You are now a registered Seller! 🎉');
              }}
              className="cart-checkout-btn"
              style={{ display: 'inline-block', width: 'auto', padding: '16px 32px' }}
            >
              Yes, Register as Seller 🚀
            </button>
          </div>
        )
      )}

      {/* Address Form Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="payment-modal-overlay">
            <motion.div className="payment-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>
                  {modalForm.id === null ? '🏠 Add Address' : '📝 Edit Address'}
                </h2>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, display: 'block', marginBottom: 6, fontSize: 14 }}>Address Type</label>
                <select 
                  className="card-input" 
                  value={modalForm.type} 
                  onChange={e => setModalForm({ ...modalForm, type: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Home 🏠">Home 🏠</option>
                  <option value="Office 🏢">Office 🏢</option>
                  <option value="Other 📍">Other 📍</option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, display: 'block', marginBottom: 6, fontSize: 14 }}>Full Address</label>
                <textarea 
                  className="card-input" 
                  rows="3"
                  value={modalForm.addr}
                  onChange={e => setModalForm({ ...modalForm, addr: e.target.value })}
                  placeholder="e.g. House No., Street, Area, City, Pin Code"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="defaultAddress" 
                  checked={modalForm.default}
                  onChange={e => setModalForm({ ...modalForm, default: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="defaultAddress" style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Set as default shipping address
                </label>
              </div>

              <button 
                onClick={handleSave} 
                className="cart-checkout-btn" 
                style={{ width: '100%', marginTop: 0 }}
              >
                Save Address
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
