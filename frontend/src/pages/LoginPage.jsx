import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import API from '../services/api';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (tab === 'signup' && !form.name) { toast.error('Please enter your name'); return; }
    
    setLoading(true);
    try {
      if (tab === 'login') {
        const { data } = await API.post('/login', { email: form.email, password: form.password });
        localStorage.setItem('token', data.token);
        login(data.user);
        toast.success('Welcome back! 👋');
      } else {
        const { data } = await API.post('/register', { name: form.name, email: form.email, password: form.password });
        localStorage.setItem('token', data.token);
        login(data.user);
        toast.success('Account created! 🎉');
      }
      navigate('/profile');
    } catch (err) {
      const msg = err.response?.data?.message || 'Connection failed. Using offline mode.';
      // Fallback to offline mode if backend is down
      if (!err.response) {
        login({ name: form.name || form.email.split('@')[0], email: form.email });
        toast.warning('Offline mode — backend not connected');
        navigate('/profile');
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liquid-login-wrapper">
      <div className="liquid-login-left">
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
        <h2>BharatMart</h2>
        <p>India's smartest shopping platform. Compare prices, save money, shop smart.</p>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['🔒 Secure Payments', '🚀 Fast Delivery', '💰 Best Prices', '🤖 AI Recommendations'].map(f => (
            <div key={f} style={{ fontSize: 14, opacity: 0.9 }}>{f}</div>
          ))}
        </div>
      </div>
      <div className="liquid-login-right">
        <div className="liquid-tabs">
          <div className={`liquid-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>{t('login')}</div>
          <div className={`liquid-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>{t('signup')}</div>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, marginTop: 0 }}>
          {tab === 'login' ? 'Welcome Back! 👋' : 'Create Account ✨'}
        </h2>
        <p style={{ color: '#64748b', marginBottom: 24, fontSize: 14 }}>
          {tab === 'login' ? 'Sign in to your account' : 'Join millions of smart shoppers'}
        </p>
        
        {tab === 'signup' && (
          <div className="liquid-input-group">
            <input 
              className="liquid-input" 
              placeholder="Full Name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>
        )}
        
        <div className="liquid-input-group">
          <input 
            className="liquid-input" 
            type="email" 
            placeholder="Email Address" 
            value={form.email} 
            onChange={e => setForm({ ...form, email: e.target.value })} 
          />
        </div>
        
        {tab === 'signup' && (
          <div className="liquid-input-group">
            <input 
              className="liquid-input" 
              type="tel" 
              placeholder="Phone Number" 
              value={form.phone} 
              onChange={e => setForm({ ...form, phone: e.target.value })} 
            />
          </div>
        )}
        
        <div className="liquid-input-group" style={{ position: 'relative' }}>
          <input 
            className="liquid-input" 
            type={showPwd ? 'text' : 'password'} 
            placeholder="Password" 
            value={form.password} 
            onChange={e => setForm({ ...form, password: e.target.value })} 
            style={{ paddingRight: 50 }} 
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} 
          />
          <button 
            onClick={() => setShowPwd(!showPwd)} 
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        <button className="liquid-btn-primary" onClick={handleSubmit} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Please wait...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>
        
        {tab === 'login' && (
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Don't have an account? </span>
            <span style={{ color: '#ff3859', fontWeight: 700, cursor: 'pointer' }} onClick={() => setTab('signup')}>Sign Up</span>
          </div>
        )}
      </div>
    </div>
  );
}
