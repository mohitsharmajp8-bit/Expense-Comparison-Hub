import { useEffect, useRef, useState } from "react";
import { useAuth } from "./App";        // adjust path if needed
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Truck, Navigation } from "lucide-react";
import BottomNav from "./BottomNav";    // adjust path

// Dynamically load Leaflet (no npm install needed)
const loadLeaflet = () => {
  return new Promise((resolve) => {
    if (window.L) {
      resolve(window.L);
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => resolve(window.L);
    document.body.appendChild(script);
  });
};

export default function TrackOrderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const animationRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Example coordinates (Bangalore)
  const startLatLng = [12.9716, 77.5946]; // Warehouse
  const endLatLng = [12.9784, 77.6408];   // Delivery address

  // Load order & delivery person
  useEffect(() => {
    if (!user) navigate("/login");
    const orders = JSON.parse(localStorage.getItem(`bm_orders_${user?.email}`) || "[]");
    const found = orders.find((o) => o.id == id);
    if (found) {
      setOrder(found);
      const persons = [
        { name: "Rahul Sharma", phone: "+91 98765 43210", photo: "👨‍🦱", vehicle: "Bike" },
        { name: "Priya Singh", phone: "+91 87654 32109", photo: "👩", vehicle: "Scooter" },
        { name: "Amit Kumar", phone: "+91 76543 21098", photo: "👨", vehicle: "Bike" },
      ];
      setDeliveryPerson(persons[Math.floor(Math.random() * persons.length)]);
    } else {
      navigate("/orders");
    }
  }, [id, user, navigate]);

  // Initialize map
  useEffect(() => {
    if (!order || !mapContainerRef.current) return;
    let isMounted = true;
    loadLeaflet().then((L) => {
      if (!isMounted) return;
      if (mapRef.current) return;

      const map = L.map(mapContainerRef.current).setView(startLatLng, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Draw route
      const polyline = L.polyline([startLatLng, endLatLng], { color: "#ff3859", weight: 4, opacity: 0.7 }).addTo(map);
      map.fitBounds(polyline.getBounds());

      // Start & end markers
      L.marker(startLatLng, {
        icon: L.divIcon({ html: "🏭", className: "custom-marker-icon", iconSize: [30, 30] }),
      }).addTo(map).bindPopup("Warehouse");

      L.marker(endLatLng, {
        icon: L.divIcon({ html: "🏠", className: "custom-marker-icon", iconSize: [30, 30] }),
      }).addTo(map).bindPopup("Delivery Address");

      // Moving delivery marker
      const deliveryIcon = L.divIcon({
        html: `<div style="background:#ff3859; width:24px; height:24px; border-radius:50%; border:2px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:14px;">🚴</div>`,
        className: "custom-marker-icon",
        iconSize: [24, 24],
      });
      const marker = L.marker(startLatLng, { icon: deliveryIcon }).addTo(map);
      markerRef.current = marker;

      let targetProgress = 0;
      if (order.status === "Delivered") targetProgress = 1;
      else if (order.status === "Shipped") targetProgress = 0.7;
      else if (order.status === "Processing") targetProgress = 0.2;
      else targetProgress = 0.5;
      setProgress(targetProgress);
    });

    return () => {
      isMounted = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [order]);

  // Update marker position when progress changes
  useEffect(() => {
    if (!markerRef.current || !mapRef.current) return;
    const lat = startLatLng[0] + (endLatLng[0] - startLatLng[0]) * progress;
    const lng = startLatLng[1] + (endLatLng[1] - startLatLng[1]) * progress;
    markerRef.current.setLatLng([lat, lng]);
    mapRef.current.panTo([lat, lng]);
  }, [progress]);

  // Animate movement if order not delivered
  useEffect(() => {
    if (!order) return;
    if (order.status === "Delivered") {
      setProgress(1);
      return;
    }
    const startProgress = progress;
    const startTime = performance.now();
    const duration = 20000;

    const animate = (now) => {
      const elapsed = now - startTime;
      let newProgress = startProgress + elapsed / duration;
      if (newProgress >= 1) {
        newProgress = 1;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        // Update order status to Delivered
        const updatedOrder = { ...order, status: "Delivered" };
        const orders = JSON.parse(localStorage.getItem(`bm_orders_${user?.email}`) || "[]");
        const updatedOrders = orders.map((o) => (o.id == order.id ? updatedOrder : o));
        localStorage.setItem(`bm_orders_${user?.email}`, JSON.stringify(updatedOrders));
        setOrder(updatedOrder);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
      setProgress(newProgress);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [order, user?.email]);

  if (!order) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Track Order #{order.id}</h1>
      <div className="order-card" style={{ marginBottom: "16px" }}>
        <div className="order-header">
          <span>Status: <strong>{order.status}</strong></span>
          <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
        </div>
        <div><strong>Items:</strong> {order.items.map(i => i.name).join(", ")}</div>
        <div><strong>Delivery Address:</strong> {order.address.street}, {order.address.city} - {order.address.pincode}</div>
        <div><strong>Total Paid:</strong> ₹{order.total.toLocaleString()}</div>
      </div>

      {deliveryPerson && (
        <div className="delivery-person-card">
          <div className="delivery-avatar">{deliveryPerson.photo}</div>
          <div className="delivery-info">
            <h4>{deliveryPerson.name}</h4>
            <p><Phone size={14} /> {deliveryPerson.phone}</p>
            <p><Truck size={14} /> Delivery via {deliveryPerson.vehicle}</p>
          </div>
        </div>
      )}

      {/* Real Leaflet Map */}
      <div ref={mapContainerRef} style={{ height: "400px", width: "100%", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }} />

      <div style={{ background: "#f0f0f0", borderRadius: "12px", padding: "12px", textAlign: "center", marginTop: "12px" }}>
        <Navigation size={18} style={{ display: "inline", marginRight: "8px" }} />
        Live location updating in real time 🚚
      </div>

      <style>{`.custom-marker-icon { background: transparent; border: none; }`}</style>
      <BottomNav />
    </div>
  );
}