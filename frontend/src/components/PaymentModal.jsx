import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, CreditCard, Banknote, Wallet, TrendingDown, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import API from '../services/api';

export default function PaymentModal({ total, onClose }) {
  const [method, setMethod] = useState('upi');
  const [paid, setPaid] = useState(false);
  const { cart, clearCart, addNotification } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load addresses from local storage
  const [addresses] = useState(() => {
    try {
      const v = localStorage.getItem('bm_addresses');
      return v ? JSON.parse(v) : [
        { id: 1, type: 'Home 🏠', addr: '42, MG Road, Koramangala, Bengaluru - 560034', default: true },
        { id: 2, type: 'Office 🏢', addr: 'No 1, Whitefield Main Road, Bengaluru - 560066', default: false },
      ];
    } catch {
      return [
        { id: 1, type: 'Home 🏠', addr: '42, MG Road, Koramangala, Bengaluru - 560034', default: true }
      ];
    }
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const def = addresses.find(a => a.default);
    return def ? def.id : (addresses[0]?.id || null);
  });
  const [customAddress, setCustomAddress] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const handlePay = async () => {
    const finalAddress = useCustom ? customAddress : (addresses.find(a => a.id === selectedAddressId)?.addr || '');
    if (!finalAddress.trim()) {
      toast.error('Please select or enter a delivery address');
      return;
    }

    setPaid(true);
    let orderNumber = 'BM' + Date.now().toString(36).toUpperCase();
    
    try {
      if (user) {
        // Place order on backend
        const { data } = await API.post('/orders', {
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            image: item.image
          })),
          total,
          paymentMethod: method,
          shippingAddress: finalAddress
        });
        if (data?.order?.orderNumber) {
          orderNumber = data.order.orderNumber;
        }
      }
    } catch (err) {
      console.warn('Backend order placement failed, falling back to local storage', err);
    }

    // Save to offline orders just in case
    try {
      const offlineOrders = JSON.parse(localStorage.getItem('bm_offline_orders') || '[]');
      offlineOrders.push({
        order_number: orderNumber,
        items: cart,
        total,
        payment_method: method,
        shipping_address: finalAddress,
        status: 'processing',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('bm_offline_orders', JSON.stringify(offlineOrders));
    } catch (e) {}

    addNotification(`🎉 Your order #${orderNumber} has been placed successfully!`);

    setTimeout(() => {
      clearCart();
      onClose();
      navigate('/orders');
      toast.success('Payment successful! 🎉 Order placed!');
    }, 2000);
  };

  return (
    <div className="payment-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div className="payment-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '550px' }}>
        {paid ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 24, fontWeight: 900 }}>Payment Successful!</div>
            <div style={{ color: '#64748b', marginTop: 8 }}>Redirecting to orders...</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>💳 Checkout</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#ff3859', marginBottom: 20 }}>₹{total.toLocaleString()}</div>
            
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Select Delivery Address</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
              {addresses.map(a => (
                <div 
                  key={a.id} 
                  onClick={() => { setSelectedAddressId(a.id); setUseCustom(false); }}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '16px', 
                    border: `2px solid ${selectedAddressId === a.id && !useCustom ? '#ff3859' : 'rgba(0,0,0,0.08)'}`,
                    background: selectedAddressId === a.id && !useCustom ? 'rgba(255,56,89,0.05)' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: '0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, marginBottom: 4 }}>
                    <span>{a.type}</span>
                    {a.default && (
                      <span style={{ fontSize: '10px', background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: '6px' }}>
                        Default
                      </span>
                    )}
                  </div>
                  <div style={{ color: '#64748b', lineHeight: 1.5 }}>{a.addr}</div>
                </div>
              ))}
              <div 
                onClick={() => setUseCustom(true)}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '16px', 
                  border: `2px solid ${useCustom ? '#ff3859' : 'rgba(0,0,0,0.08)'}`,
                  background: useCustom ? 'rgba(255,56,89,0.05)' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: '0.2s'
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 4 }}>✏️ Add / Use Custom Address</div>
                {useCustom && (
                  <textarea 
                    className="card-input" 
                    style={{ marginTop: 8, height: '65px', resize: 'none', padding: '10px', borderRadius: '12px' }}
                    value={customAddress}
                    onChange={e => setCustomAddress(e.target.value)}
                    placeholder="Enter full delivery address here..."
                    onClick={e => e.stopPropagation()}
                  />
                )}
              </div>
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Payment Method</h3>
            <div className="payment-options">
              {[
                { id: 'upi', icon: <Smartphone size={22} />, label: 'UPI' },
                { id: 'card', icon: <CreditCard size={22} />, label: 'Card' },
                { id: 'cod', icon: <Banknote size={22} />, label: 'COD' },
                { id: 'wallet', icon: <Wallet size={22} />, label: 'Wallet' },
                { id: 'emi', icon: <TrendingDown size={22} />, label: 'EMI' },
              ].map(opt => (
                <div key={opt.id} className={`payment-option ${method === opt.id ? "active" : ""}`} onClick={() => setMethod(opt.id)}>
                  {opt.icon}<span>{opt.label}</span>
                </div>
              ))}
            </div>

            {method === 'upi' && <input className="card-input" placeholder="Enter UPI ID (e.g. name@upi)" />}
            {method === 'card' && (
              <>
                <input className="card-input" placeholder="Card Number" />
                <div className="card-row">
                  <input className="card-input" placeholder="MM/YY" style={{ flex: 1 }} />
                  <input className="card-input" placeholder="CVV" style={{ flex: 1 }} />
                </div>
                <input className="card-input" placeholder="Cardholder Name" />
              </>
            )}
            {method === 'cod' && (
              <div style={{ padding: '16px', background: 'rgba(34,197,94,0.1)', borderRadius: 12, marginTop: 10, border: '1px solid rgba(34,197,94,0.2)', fontSize: 14, color: '#16a34a' }}>
                ✅ Pay ₹{total.toLocaleString()} when your order arrives
              </div>
            )}
            {method === 'wallet' && (
              <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map(w => (
                  <div key={w} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.4)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{w}</div>
                ))}
              </div>
            )}
            {method === 'emi' && (
              <div style={{ marginTop: 10 }}>
                {[3, 6, 9, 12].map(m => (
                  <div key={m} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.3)', borderRadius: 10, marginBottom: 8, border: '1px solid rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{m} months</span>
                    <span style={{ color: '#ff3859' }}>₹{Math.round(total / m).toLocaleString()}/mo</span>
                  </div>
                ))}
              </div>
            )}
            
            <button onClick={handlePay} className="cart-checkout-btn" style={{ marginTop: 28 }}>
              🔒 Pay ₹{total.toLocaleString()} Securely
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
