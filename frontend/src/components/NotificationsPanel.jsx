import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function NotificationsPanel() {
  const { showNotif, setShowNotif, notifications } = useApp();

  if (!showNotif) return null;

  return (
    <div className="notif-panel">
      <div className="notif-header">
        <span>🔔 Notifications</span>
        <button onClick={() => setShowNotif(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
            No new notifications
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className="notif-item">
              {n.unread && <div className="notif-dot" />}
              <div>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
