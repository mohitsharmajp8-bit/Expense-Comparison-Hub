import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🤔</div>
      <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 12, background: 'linear-gradient(135deg,#ff3859,#ff9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: 0 }}>404</h1>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Page Not Found</div>
      <div style={{ color: '#94a3b8', marginBottom: 32 }}>The page you're looking for doesn't exist or has been moved.</div>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '16px 32px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 16, boxShadow: '0 10px 20px rgba(255,56,89,0.3)' }}
      >
        Go Home →
      </button>
    </div>
  );
}
