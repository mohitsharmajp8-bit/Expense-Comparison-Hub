import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Clock, Phone, MessageSquare, ArrowLeft, Check, Sparkles, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../contexts/AuthContext';
import { demoOrders } from '../data/products';
import API from '../services/api';

// Fix default marker icons (Leaflet requires this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Premium DivIcons for Map
const hubIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background:#8b5cf6;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid white;box-shadow:0 4px 12px rgba(139,92,246,0.4);">🏪</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const bikeIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background:#ff3859;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-size:24px;border:2px solid white;box-shadow:0 4px 16px rgba(255,56,89,0.5);animation: bounceRider 1.5s infinite alternate;">🛵</div>`,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const homeIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background:#16a34a;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid white;box-shadow:0 4px 12px rgba(22,163,74,0.4);">🏠</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Adding bounce animation style inside standard CSS would be clean, let's inject a style block
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounceRider {
      0% { transform: translateY(0); }
      100% { transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(style);
}

// Street-level waypoints in Koramangala, Bengaluru
const routeWaypoints = [
  [12.9385, 77.6150], // Hub (Start)
  [12.9372, 77.6155], 
  [12.9355, 77.6162],
  [12.9340, 77.6170],
  [12.9325, 77.6185],
  [12.9312, 77.6200],
  [12.9300, 77.6218],
  [12.9290, 77.6235],
  [12.9282, 77.6252],
  [12.9280, 77.6270]  // Customer Address (End)
];

const hubPos = routeWaypoints[0];
const deliveryPos = routeWaypoints[routeWaypoints.length - 1];

export default function TrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rider position & tracking states
  const [waypointIndex, setWaypointIndex] = useState(0);
  const [riderPos, setRiderPos] = useState(hubPos);
  const [deliveryStep, setDeliveryStep] = useState(0); // 0: Packed, 1: Rider Assigned, 2: Dispatched, 3: Out for Delivery, 4: Arrived
  const [statusMessage, setStatusMessage] = useState('Store is packing your order...');
  const [eta, setEta] = useState(10); // in minutes

  useEffect(() => {
    async function loadTrackedOrder() {
      setLoading(true);
      try {
        const { data } = await API.get('/orders');
        if (data.length > 0) {
          const stateOrderId = location.state?.orderId;
          const found = stateOrderId
            ? data.find(o => o.order_number === stateOrderId || o.id.toString() === stateOrderId)
            : data[0]; // default to latest order
          setOrder(found || data[0]);
        } else {
          // Check local offline orders
          const offline = JSON.parse(localStorage.getItem('bm_offline_orders') || '[]');
          if (offline.length > 0) {
            setOrder(offline[offline.length - 1]);
          } else {
            setOrder(demoOrders[0]);
          }
        }
      } catch (err) {
        console.warn('Failed to load orders, falling back to demo orders', err);
        setOrder(demoOrders[0]);
      } finally {
        setLoading(false);
      }
    }
    loadTrackedOrder();
  }, [user, location.state]);

  // Rider movement animation
  useEffect(() => {
    if (loading || !order) return;

    const interval = setInterval(() => {
      setWaypointIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < routeWaypoints.length) {
          setRiderPos(routeWaypoints[nextIndex]);
          
          // Update status based on waypoint progress
          if (nextIndex === 1) {
            setDeliveryStep(1);
            setStatusMessage('Rider assigned: Ravi Kumar. Preparing dispatch...');
            setEta(9);
          } else if (nextIndex === 3) {
            setDeliveryStep(2);
            setStatusMessage('Rider Ravi Kumar is dispatched! Order has left the Koramangala Hub.');
            setEta(7);
          } else if (nextIndex === 6) {
            setDeliveryStep(3);
            setStatusMessage('Rider is traversing intermediate transit points. 1.2 km away.');
            setEta(4);
          } else if (nextIndex === 8) {
            setDeliveryStep(3);
            setStatusMessage('Rider is in your residential block. Almost there!');
            setEta(2);
          }
          return nextIndex;
        } else {
          setRiderPos(deliveryPos);
          setDeliveryStep(4);
          setStatusMessage('Rider has arrived at your address! Please receive your delivery. 📦');
          setEta(0);
          toast.success('Rider has arrived! 🎉');
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 4000); // moves every 4 seconds

    return () => clearInterval(interval);
  }, [loading, order]);

  if (loading) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}>
        ⏳ Loading live tracker details...
      </div>
    );
  }

  // Parse order items safely
  let orderItems = [];
  if (order) {
    try {
      orderItems = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);
    } catch (e) {
      orderItems = [];
    }
  }

  const trackerSteps = [
    { label: 'Packed', desc: 'Order packed at store', step: 0 },
    { label: 'Rider Assigned', desc: 'Ravi Kumar is at store', step: 1 },
    { label: 'Dispatched', desc: 'Rider picked up order', step: 2 },
    { label: 'Out for Delivery', desc: 'Rider is in your area', step: 3 },
    { label: 'Arrived', desc: 'Collect your order', step: 4 },
  ];

  return (
    <div className="page">
      <button 
        onClick={() => navigate('/orders')} 
        style={{ 
          marginBottom: 20, 
          padding: '10px 20px', 
          background: 'rgba(255,255,255,0.4)', 
          border: '1px solid rgba(255,255,255,0.5)', 
          borderRadius: 12, 
          cursor: 'pointer', 
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          backdropFilter: 'blur(8px)' 
        }}
      >
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <h1 className="page-title">⚡ Live Delivery Tracking</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }} className="cart-layout">
        
        {/* Left Section: Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', height: 480, position: 'relative' }}>
            <MapContainer center={[12.933, 77.621]} zoom={15} style={{ height: '100%', width: '100%', zIndex: 1 }}>
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution="© OpenStreetMap contributors" 
              />
              
              {/* Polyline Route Trail */}
              {/* Remaining Path - Dashed */}
              <Polyline 
                positions={routeWaypoints.slice(waypointIndex)} 
                color="#cbd5e1" 
                dashArray="5, 10" 
                weight={4} 
              />
              {/* Traversed Path - Solid Pink */}
              <Polyline 
                positions={routeWaypoints.slice(0, waypointIndex + 1)} 
                color="#ff3859" 
                weight={5} 
              />

              {/* Markers */}
              <Marker position={hubPos} icon={hubIcon}>
                <Popup>🏬 Koramangala Hub Store</Popup>
              </Marker>
              
              <Marker position={riderPos} icon={bikeIcon}>
                <Popup>🛵 Rider: Ravi Kumar<br />ETA: {eta > 0 ? `${eta} mins` : 'Arrived!'}</Popup>
              </Marker>
              
              <Marker position={deliveryPos} icon={homeIcon}>
                <Popup>🏠 Your address<br />{order?.shipping_address || 'Delivery Location'}</Popup>
              </Marker>
            </MapContainer>
            
            {/* Live Speed / Status Widget Overlay on Map */}
            <div style={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16, 
              background: 'rgba(15,23,42,0.85)', 
              backdropFilter: 'blur(8px)',
              padding: '12px 18px', 
              borderRadius: '16px', 
              color: 'white', 
              zIndex: 10,
              fontSize: '13px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#ff3859' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ff3859', animation: 'pulse 1s infinite alternate' }} />
                LIVE RADAR ACTIVE
              </div>
              <div style={{ marginTop: 4, fontWeight: 500, color: '#e2e8f0' }}>
                Rider speed: ~24 km/h • Traffic: Normal
              </div>
            </div>
          </div>

          {/* Map details block */}
          <div className="glass-panel" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Rider Status</div>
              <div style={{ fontSize: 13, background: 'rgba(22,163,74,0.1)', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                {eta > 0 ? 'On Time' : 'Arrived'}
              </div>
            </div>
            <div style={{ color: '#ff3859', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{statusMessage}</div>
            <div style={{ color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={14} /> Hub Address: Koramangala 3rd Block, Industrial Area, Bengaluru
            </div>
          </div>
        </div>

        {/* Right Section: Zepto/Flipkart Dispatch Timeline and Order Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Dispatch Timeline */}
          <div className="glass-panel" style={{ padding: 24 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 900 }}>📦 Dispatch Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {trackerSteps.map((step, idx) => {
                const isCompleted = deliveryStep >= step.step;
                const isCurrent = deliveryStep === step.step;
                return (
                  <div key={idx} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                    {idx < trackerSteps.length - 1 && (
                      <div style={{ 
                        position: 'absolute', 
                        left: '12px', 
                        top: '24px', 
                        bottom: '-16px', 
                        width: '2px', 
                        background: deliveryStep > step.step ? '#ff3859' : '#e2e8f0',
                        zIndex: 1
                      }} />
                    )}
                    
                    <div style={{ 
                      width: '26px', 
                      height: '26px', 
                      borderRadius: '50%', 
                      background: isCompleted ? '#ff3859' : '#f1f5f9', 
                      color: isCompleted ? 'white' : '#94a3b8', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `2px solid ${isCurrent ? '#ff3859' : 'transparent'}`,
                      zIndex: 2,
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: isCurrent ? '0 0 8px rgba(255,56,89,0.5)' : 'none'
                    }}>
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : idx + 1}
                    </div>
                    
                    <div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 800, 
                        color: isCompleted ? '#1e293b' : '#94a3b8' 
                      }}>
                        {step.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ETA Card */}
          <div className="glass-panel" style={{ padding: 24, textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,56,89,0.1), rgba(255,152,0,0.1))', border: '1px solid rgba(255,56,89,0.2)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
              Estimated Arrival Time
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#ff3859', margin: '12px 0 6px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Clock size={32} />
              {eta > 0 ? `${eta} MINS` : 'ARRIVED'}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
              {eta > 0 ? 'Delivering via Swift Scooter' : 'Rider is outside!'}
            </div>
          </div>

          {/* Rider Info Card */}
          <div className="glass-panel" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg,#ff3859,#ff9800)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '22px' 
              }}>
                👨🏻‍✈️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: 15 }}>Ravi Kumar</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Delivery Executive • ⭐ 4.9 (420+ rides)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button style={{ 
                flex: 1, 
                padding: '10px 14px', 
                background: 'rgba(255,255,255,0.4)', 
                border: '1px solid rgba(0,0,0,0.08)', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 6,
                fontSize: '13px'
              }}>
                <Phone size={14} /> Call Rider
              </button>
              <button style={{ 
                flex: 1, 
                padding: '10px 14px', 
                background: 'rgba(255,255,255,0.4)', 
                border: '1px solid rgba(0,0,0,0.08)', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 6,
                fontSize: '13px'
              }}>
                <MessageSquare size={14} /> Chat
              </button>
            </div>
          </div>

          {/* Tracked Order Details */}
          {order && (
            <div className="glass-panel" style={{ padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: '#64748b', marginBottom: 12 }}>
                Tracking Details
              </div>
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                <span style={{ fontWeight: 600 }}>Order ID:</span> #{order.order_number || order.id}
              </div>
              <div style={{ fontSize: 13, marginBottom: 12 }}>
                <span style={{ fontWeight: 600 }}>Deliver to:</span> {order.shipping_address || 'MG Road, Bengaluru'}
              </div>
              
              <div style={{ borderTop: '1px dashed rgba(0,0,0,0.08)', paddingTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Items:</div>
                <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {orderItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569' }}>
                      <span style={{ fontWeight: 600 }}>{item.quantity || 1}x {item.name}</span>
                      <span>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
