import { useState } from 'react';
import { Bell, Check, X, Tag } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PriceDropAlertModal({ product, onClose }) {
  const [targetPrice, setTargetPrice] = useState(Math.round(product.price * 0.9));
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !targetPrice) {
      toast.error('Please enter a valid email and target price.');
      return;
    }
    setSubmitted(true);
    toast.success(`Price drop alert set for ₹${targetPrice.toLocaleString()}! We'll email ${email} when the price drops.`);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255, 56, 89, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#ff3859' }}>
              <Bell size={20} style={{ margin: '0 auto' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Set Price Drop Alert</h3>
              <div style={{ fontSize: 12, color: '#64748b' }}>Get instant email & push alerts</div>
            </div>
          </div>
          <div onClick={onClose} style={{ cursor: 'pointer', padding: 4 }}><X size={20} /></div>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Check size={32} />
            </div>
            <h4 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>Alert Active!</h4>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
              We will notify <strong>{email}</strong> the second <strong>{product.name}</strong> drops to ₹{targetPrice.toLocaleString()} or lower.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: 14, background: 'rgba(0,0,0,0.03)', padding: 12, borderRadius: 16, marginBottom: 20, alignItems: 'center' }}>
              <img src={product.image} alt={product.name} style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{product.name}</div>
                <div style={{ fontSize: 13, color: '#ff3859', fontWeight: 800 }}>Current Best: ₹{product.price.toLocaleString()}</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>
                TARGET PRICE (IN ₹)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b' }}>₹</span>
                <input
                  type="number"
                  className="card-input"
                  style={{ paddingLeft: 34, marginTop: 0 }}
                  value={targetPrice}
                  onChange={e => setTargetPrice(Number(e.target.value))}
                  min="1"
                  max={product.price}
                  required
                />
              </div>
              <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Tag size={12} /> Suggested target: ₹{Math.round(product.price * 0.9).toLocaleString()} (10% lower)
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>
                YOUR EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="card-input"
                style={{ marginTop: 0 }}
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="liquid-btn-primary" style={{ marginTop: 0 }}>
              🔔 Notify Me On Price Drop
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
