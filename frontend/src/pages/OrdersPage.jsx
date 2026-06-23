import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { demoOrders } from '../data/products';
import API from '../services/api';

export default function OrdersPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const statusColor = { 
    delivered: '#16a34a', 
    shipped: '#2563eb', 
    processing: '#f59e0b',
    confirmed: '#2563eb',
    out_for_delivery: '#ff9800'
  };

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await API.get('/orders');
        // Map backend orders to UI structure
        const formatted = data.map(o => {
          let orderItems = [];
          try {
            orderItems = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
          } catch (e) {
            orderItems = [];
          }
          
          return {
            id: o.order_number || o.id.toString(),
            name: orderItems.map(item => item.name).join(', ') || 'Order Details',
            image: orderItems[0]?.image || 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=300',
            date: new Date(o.created_at).toLocaleDateString(),
            amount: parseFloat(o.total),
            status: o.status,
            steps: [
              { label: 'Order Placed', desc: 'We have received your order.', done: true },
              { label: 'Confirmed', desc: 'Seller has accepted your order.', done: o.status !== 'processing' },
              { label: 'Shipped', desc: 'Rider is on the way.', done: ['shipped', 'out_for_delivery', 'delivered'].includes(o.status) },
              { label: 'Out for Delivery', desc: 'Rider is in your area.', done: ['out_for_delivery', 'delivered'].includes(o.status) },
              { label: 'Delivered', desc: 'Successfully delivered.', done: o.status === 'delivered' }
            ]
          };
        });
        setOrders(formatted);
      } catch (err) {
        console.warn('Could not load backend orders, showing local demo orders', err);
        setOrders(demoOrders);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  const displayOrders = user ? orders : demoOrders;

  return (
    <div className="page">
      <h1 className="page-title">📦 {t('orders')}</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
          ⏳ Loading your orders...
        </div>
      ) : displayOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, opacity: 0.5 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>No orders placed yet</div>
          <button 
            onClick={() => navigate('/')} 
            style={{ marginTop: 24, padding: '12px 24px', background: '#ff3859', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}
          >
            Go Shop
          </button>
        </div>
      ) : (
        displayOrders.map(order => (
          <div 
            key={order.id} 
            className="order-card" 
            style={{ cursor: 'pointer' }} 
            onClick={() => setSelected(selected?.id === order.id ? null : order)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img 
                src={order.image} 
                alt={order.name} 
                style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><rect x="10" y="10" width="180" height="180" rx="12" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1.5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2394a3b8">BharatMart</text></svg>';
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                  {order.name}
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Order #{order.id} • {order.date}</div>
                <div style={{ color: '#ff3859', fontWeight: 700, marginTop: 4 }}>₹{order.amount.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  background: (statusColor[order.status] || '#f59e0b') + '20', 
                  color: statusColor[order.status] || '#f59e0b', 
                  padding: '6px 14px', 
                  borderRadius: 999, 
                  fontWeight: 700, 
                  fontSize: 13, 
                  textTransform: 'capitalize' 
                }}>
                  {order.status}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8' }}>
                  {selected?.id === order.id ? 'Hide Details' : 'Track Order'} {selected?.id === order.id ? '↑' : '↓'}
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {selected?.id === order.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    <div style={{ fontWeight: 800, marginBottom: 16 }}>Delivery Timeline</div>
                    <div className="order-timeline">
                      {order.steps.map((step, i) => {
                        const isActive = !step.done && (i === 0 || order.steps[i - 1].done);
                        return (
                          <div key={i} className="timeline-step">
                            <div className={`timeline-icon ${step.done ? 'completed' : isActive ? 'active' : ''}`}>
                              {step.done ? <CheckCircle size={18} /> : isActive ? <Clock size={18} /> : <Package size={18} />}
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-title" style={{ color: step.done ? '#16a34a' : isActive ? '#ff3859' : '#94a3b8' }}>
                                {step.label}
                              </div>
                              <div className="timeline-desc">{step.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button 
                      onClick={e => { e.stopPropagation(); navigate('/track'); }} 
                      style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14, marginTop: 16 }}
                    >
                      🗺️ Live Track Order
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  );
}
