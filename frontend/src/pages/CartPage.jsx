import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PaymentModal from '../components/PaymentModal';

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useApp();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;

  if (cart.length === 0) return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>Your cart is empty</div>
      <div style={{ color: '#94a3b8', marginTop: 8, marginBottom: 24 }}>Add some awesome products!</div>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 16 }}
      >
        Shop Now →
      </button>
    </div>
  );

  return (
    <div className="page">
      <h1 className="page-title">🛒 Your Cart</h1>
      <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><rect x="10" y="10" width="180" height="180" rx="12" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="1.5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2394a3b8">BharatMart</text></svg>';
                }}
              />
              <div style={{ flex: 1, marginLeft: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{item.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.category}</div>
                <div style={{ color: '#ff3859', fontWeight: 700, fontSize: 18, marginTop: 6 }}>₹{item.price.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 12, padding: '4px 8px', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <button 
                    onClick={() => updateQty(item.id, (item.quantity || 1) - 1)} 
                    style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 800, minWidth: 24, textAlign: 'center' }}>{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateQty(item.id, (item.quantity || 1) + 1)} 
                    style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff3859' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 16, marginTop: 0 }}>Order Summary</h3>
          <div className="cart-total-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="cart-total-row"><span>Shipping</span><span style={{ color: shipping === 0 ? '#16a34a' : 'inherit' }}>{shipping === 0 ? 'FREE' : '₹' + shipping}</span></div>
          {shipping === 0 && <div style={{ fontSize: 12, color: '#16a34a', marginBottom: 8 }}>🎉 Free shipping applied!</div>}
          <div className="cart-total-row final"><span>Total</span><span style={{ color: '#ff3859' }}>₹{total.toLocaleString()}</span></div>
          <button className="cart-checkout-btn" onClick={() => setShowPayment(true)}>Proceed to Checkout →</button>
        </div>
      </div>
      {showPayment && <PaymentModal total={total} onClose={() => setShowPayment(false)} />}
    </div>
  );
}
