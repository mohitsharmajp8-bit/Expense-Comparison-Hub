import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
  useLocation
} from "react-router-dom";

import {
  useState, useEffect, createContext, useContext, useRef
} from "react";

import {
  Search, ShoppingCart, Heart, User, Mic, Sun, Moon, Star,
  Home as HomeIcon, Trash2, TrendingUp, Zap, ChevronDown, ChevronUp,
  BarChart3, LogOut, Mail, Lock, User as UserIcon, Phone, Truck,
  CreditCard, Smartphone, Banknote, Wallet, Navigation, MessageCircle,
  X, Sparkles, Bell, TrendingDown, Bot, ChartNoAxesCombined, Plus, Minus,
  Eye, EyeOff, Sparkle, MapPin, CheckCircle, Clock, Package
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons (Leaflet requires this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bike icon for rider
const bikeIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background: #ff3859; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">🛵</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ============================================================
// GLOBAL CSS (original – unchanged)
// ============================================================
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap');

*{ margin:0; padding:0; box-sizing:border-box; font-family:Inter,sans-serif; scroll-behavior:smooth; }
html{ font-size:16px; }
body{ min-height:100vh; background:radial-gradient(circle at top left, rgba(255,56,89,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(255,152,0,0.14), transparent 22%), #f1f3f6; color:#111; transition:background 0.4s, color 0.4s; }
body.dark{ background:#0b1220; color:#f5f7ff; }
body.dark .header,body.dark .product-card,body.dark .category-card,body.dark .cart-page,body.dark .wishlist-page,
body.dark .profile-page,body.dark .platform-compare-card,body.dark .bottom-nav,body.dark .cart-item,
body.dark .price-analysis-card,body.dark .login-card,body.dark .address-card,body.dark .order-card,
body.dark .payment-modal{ background:#161a28; color:#f5f7ff; }
body.dark .search-input,body.dark .icon-btn{ background:#1f2435; color:#f5f7ff; }
body.dark .product-desc,body.dark .platform-label{ color:#a6aec3; }
body.dark .platform-row{ border-color:#29304b; }
body.dark .offer{ background:#1a2b1d; color:#98ee99; }
body.dark .footer{ background:#07121f; }
body.dark .stat-card{ background:#131925; }
body.dark .time-btn{ background:#1f2435; color:#a6aec3; }
body.dark .time-btn.active{ background:#ff6d84; color:white; }
body.dark .price-chart{ background:#192033; }
body.dark .login-input{ background:#141a28; color:#f5f7ff; border-color:#2d3560; }
body.dark .login-tab{ color:#a6aec3; }
body.dark .login-tab.active{ color:#ff6d84; border-bottom-color:#ff6d84; }
a{ text-decoration:none; color:inherit; }
::selection{ background:rgba(255,56,89,0.18); color:#111; }

/* Kannada text support */
.kannada-text { font-family: 'Noto Sans Kannada', 'Kannada', serif; }

/* ============================================================
   DAY/NIGHT TOGGLE SWITCH (like modern apps)
============================================================ */
.toggle-switch {
  position: relative;
  width: 54px;
  height: 30px;
  background: #d1d5db;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
.toggle-switch.active {
  background: #ff3859;
}
.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.toggle-switch.active .toggle-knob {
  transform: translateX(24px);
}
.toggle-switch:hover .toggle-knob {
  transform: scale(1.05);
}
.toggle-switch.active:hover .toggle-knob {
  transform: translateX(24px) scale(1.05);
}

/* ============================================================
   AI BADGE ON PRODUCTS
============================================================ */
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}
.ai-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.5);
}
.ai-badge .sparkle {
  animation: sparklePulse 1.5s ease-in-out infinite;
}
@keyframes sparklePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.header{ position:sticky; top:0; z-index:1000; background:rgba(255,255,255,0.86); backdrop-filter:blur(14px); box-shadow:0 16px 40px rgba(15,23,42,0.12); border-bottom:1px solid rgba(229,231,235,0.6); }
.header-top{ display:flex; align-items:center; justify-content:space-between; padding:18px 24px; gap:24px; max-width:1240px; margin:0 auto; }
.logo{ font-size:28px; font-weight:900; letter-spacing:-0.03em; background:linear-gradient(135deg,#ff3859,#ff9800); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; cursor:pointer; white-space:nowrap; }
.search-box{ flex:1; position:relative; }
.search-input{ width:100%; padding:16px 56px 16px 20px; border-radius:999px; border:1.5px solid rgba(226,232,240,0.95); background:#fff; font-size:15px; outline:none; transition:all 0.25s ease; box-shadow:0 10px 24px rgba(15,23,42,0.06); }
.search-input:focus{ border-color:#ff5e7a; background:#fff; box-shadow:0 16px 40px rgba(255,56,89,0.14); }
.search-icon{ position:absolute; right:18px; top:50%; transform:translateY(-50%); color:#a3a3a3; }
.nav-icons{ display:flex; align-items:center; gap:14px; }
.icon-btn{ width:46px; height:46px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease; position:relative; box-shadow:0 10px 24px rgba(15,23,42,0.08); }
.icon-btn:hover{ background:#ff3859; color:#fff; transform:translateY(-2px) scale(1.05); box-shadow:0 18px 32px rgba(255,136,0,0.2); }
.cart-badge{ position:absolute; top:-6px; right:-6px; background:#ff3859; color:#fff; width:20px; height:20px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; animation:pulse 1.2s infinite; }

.hero{ margin:24px 20px 0; border-radius:34px; padding:52px; background:linear-gradient(135deg,#ff6a00,#ffd100); background-size:200% 200%; color:#fff; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:32px; overflow:visible; position:relative; animation:heroPulse 8s ease infinite, heroShift 15s ease-in-out infinite; }
@keyframes heroPulse{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes heroShift{ 0%{transform:translateY(0px)} 50%{transform:translateY(-4px)} 100%{transform:translateY(0px)} }
.hero::before{ content:''; position:absolute; top:-80px; right:-80px; width:420px; height:420px; background:radial-gradient(circle, rgba(255,255,255,0.18), transparent 58%); border-radius:50%; filter: blur(18px); animation:orbitPulse 12s ease-in-out infinite; }
@keyframes orbitPulse{ 0%{transform:scale(1); opacity:0.6} 50%{transform:scale(1.15); opacity:0.3} 100%{transform:scale(1); opacity:0.6} }
.hero-tag{ display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.16); border:1px solid rgba(255,255,255,0.22); padding:8px 16px; border-radius:999px; font-size:13px; color:#ffe6f0; margin-bottom:18px; backdrop-filter:blur(10px); }
.hero h1{ font-size:52px; font-weight:900; margin-bottom:14px; line-height:1.05; max-width:680px; animation:slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes slideInUp{ from{opacity:0; transform:translateY(40px)} to{opacity:1; transform:translateY(0)} }
.hero h1 span{ color:#fff; background:linear-gradient(135deg,#fff,#ffd1da); -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s ease-in-out infinite; }
@keyframes shimmer{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
.hero p{ font-size:18px; opacity:0.92; margin-bottom:28px; max-width:520px; line-height:1.75; letter-spacing:0.01em; animation:fadeInUp 1s ease 0.2s both; }
.hero-stats{ display:flex; gap:24px; margin-bottom:26px; flex-wrap:wrap; animation:fadeInUp 1s ease 0.4s both; }
.hero-stat{ text-align:left; }
.hero-stat strong{ display:block; font-size:26px; font-weight:900; animation:countUp 2s ease-out; }
@keyframes countUp{ from{transform:translateY(20px); opacity:0} to{transform:translateY(0); opacity:1} }
.hero-stat span{ font-size:13px; opacity:0.85; }
.hero button{ padding:16px 38px; border:none; border-radius:999px; background:linear-gradient(135deg,#fff,#ffd1da); color:#111; font-weight:800; cursor:pointer; font-size:16px; transition:transform 0.3s ease, box-shadow 0.3s ease; box-shadow:0 20px 40px rgba(255,255,255,0.22); position:relative; overflow:hidden; animation:fadeInUp 1s ease 0.6s both; }
.hero button:hover{ transform:translateY(-3px) scale(1.05); box-shadow:0 28px 60px rgba(255,255,255,0.35); }
.hero button::after{ content:''; position:absolute; top:0; left:-110%; width:120%; height:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent); transition:0.5s; }
.hero button:hover::after{ left:100%; }
@keyframes fadeInUp{ from{opacity:0; transform:translateY(20px)} to{opacity:1; transform:translateY(0)} }

.hero{ display:flex; gap:28px; align-items:flex-start; }
.hero h1{ color:#0b1220; }
.hero p, .hero-tag{ color:#374151; }

.hero-banner{ display:flex; flex-direction:column; align-items:stretch; justify-content:space-between; width:520px; height:280px; border-radius:12px; background:#fff; padding:0; box-shadow:0 18px 50px rgba(15,23,42,0.06); overflow:hidden; position:relative; animation:bannerSlideIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both; transition:transform 0.3s ease, box-shadow 0.3s ease; }
@keyframes bannerSlideIn{ from{opacity:0; transform:translateX(60px)} to{opacity:1; transform:translateX(0)} }
.hero-banner:hover{ transform:translateY(-6px); box-shadow:0 28px 70px rgba(15,23,42,0.12); }
.hero-banner .banner-image{ flex:1; width:100%; display:flex; align-items:flex-end; justify-content:space-between; padding:18px; background:linear-gradient(135deg,#ff6a00 0%, #ff9800 60%); color:#fff; position:relative; overflow:visible; background-size:150% 150%; animation:gradientShift 8s ease infinite; }
@keyframes gradientShift{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
.hero-banner .banner-image svg{ position:absolute; right:20px; bottom:10px; height:240px; width:auto; opacity:0.95; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.15)); animation:phoneFloat 3s ease-in-out infinite; }
@keyframes phoneFloat{ 0%{transform:translateY(0px)} 50%{transform:translateY(-8px)} 100%{transform:translateY(0px)} }
.hero-banner .banner-text{ position:relative; z-index:2; animation:fadeIn 0.8s ease 0.3s both; }
@keyframes fadeIn{ from{opacity:0} to{opacity:1} }
.hero-banner .ad-title{ font-size:20px; font-weight:900; margin-bottom:6px; animation:titleSlide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both; }
@keyframes titleSlide{ from{opacity:0; transform:translateX(-20px)} to{opacity:1; transform:translateX(0)} }
.hero-banner .ad-sub{ font-size:13px; opacity:0.9; animation:fadeIn 0.8s ease 0.4s both; }
.hero-banner .ad-badge{ position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.55); color:#fff; padding:6px 10px; border-radius:10px; font-weight:800; font-size:12px; animation:badgePulse 2s ease-in-out infinite; }
@keyframes badgePulse{ 0%, 100%{transform:scale(1); opacity:1} 50%{transform:scale(1.1); opacity:0.8} }
.hero-banner .banner-controls{ display:flex; gap:8px; padding:10px 14px; align-items:center; justify-content:flex-end; background:linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.00)); animation:fadeIn 0.8s ease 0.6s both; }
.hero-banner .dot{ width:8px; height:8px; border-radius:999px; background:rgba(0,0,0,0.14); cursor:pointer; transition:all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hero-banner .dot:hover{ transform:scale(1.3); background:rgba(0,0,0,0.3); }
.hero-banner .dot.active{ background:#ff6a00; box-shadow:0 4px 10px rgba(255,106,0,0.18); animation:dotPulse 1.5s ease-in-out infinite; }
@keyframes dotPulse{ 0%, 100%{box-shadow:0 4px 10px rgba(255,106,0,0.18)} 50%{box-shadow:0 6px 16px rgba(255,106,0,0.35)} }

@media (min-width:1024px){
  .hero{ padding:48px; }
  .hero h1{ font-size:56px; animation:slideInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .hero button{ animation:fadeInUp 1.2s ease 0.8s both; }
  .hero-banner{ margin-left:auto; transform:translateY(0); width:540px; height:300px; animation:bannerSlideIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both; }
  .hero-banner .banner-image svg{ height:280px; right:15px; bottom:5px; animation:phoneFloat 3.5s ease-in-out infinite; }
  .hero-banner .ad-title{ font-size:24px; }
  .hero-banner .ad-sub{ font-size:14px; }
}

.categories{ padding:20px; }
.section-header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
.section-title{ font-size:24px; font-weight:800; background:linear-gradient(135deg,#1a1a2e,#ff3859); -webkit-background-clip:text; background-clip:text; color:transparent; }
body.dark .section-title{ background:linear-gradient(135deg,#fff,#ff8fa3); -webkit-background-clip:text; background-clip:text; }
.category-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; }
.category-card{ background:#fff; padding:18px 12px; border-radius:16px; text-align:center; cursor:pointer; transition:0.3s; border:2px solid transparent; }
.category-card:hover{ transform:translateY(-8px) scale(1.02); box-shadow:0 20px 35px rgba(0,0,0,0.15); }
.category-card.active{ border-color:#ff3859; background:#fff5f7; }
.category-icon{ font-size:36px; margin-bottom:8px; transition:transform 0.2s; }
.category-card:hover .category-icon{ transform:scale(1.1); }

.products{ padding:20px; }
.product-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(380px,1fr)); gap:20px; }
.product-card{ background:rgba(255,255,255,0.94); border-radius:28px; overflow:hidden; transition:transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease; border:1px solid rgba(255,255,255,0.85); box-shadow:0 18px 35px rgba(15,23,42,0.08); }
.product-card:hover{ transform:translateY(-10px); box-shadow:0 28px 55px rgba(15,23,42,0.14); border-color:rgba(255,56,89,0.18); }
.product-image-wrap{ position:relative; overflow:hidden; background:linear-gradient(135deg,#fbfbfd,#e9edf7); height:260px; }
.product-image{ width:100%; height:100%; object-fit:cover; transition:transform 0.45s ease; }
.product-card:hover .product-image{ transform:scale(1.05) rotate(0.5deg); }
.discount-badge{ position:absolute; top:16px; left:16px; background:linear-gradient(135deg,#ff6a00,#ffd100); color:#fff; padding:7px 14px; border-radius:999px; font-size:12px; font-weight:700; z-index:2; box-shadow:0 10px 25px rgba(255,136,0,0.18); }
.delivery-badge{ position:absolute; top:16px; right:16px; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); color:#fff; padding:6px 14px; border-radius:999px; font-size:12px; font-weight:600; z-index:2; }
.product-content{ padding:20px; }
.product-title{ font-size:19px; font-weight:800; margin-bottom:8px; transition:color 0.25s ease; }
.product-card:hover .product-title{ color:#ff3859; }
.product-desc{ font-size:13px; color:#6b7280; margin-bottom:12px; line-height:1.6; }
.rating{ display:flex; align-items:center; gap:8px; margin-bottom:14px; }
.rating-score{ background:#e8f5e9; color:#2e7d32; font-size:13px; font-weight:700; padding:5px 10px; border-radius:8px; display:flex; align-items:center; gap:4px; }
.review-count{ font-size:13px; color:#9ca3af; }
.price{ display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
.current-price{ font-size:26px; font-weight:900; color:#ff3859; }
.old-price{ text-decoration:line-through; color:#a1a1aa; font-size:14px; }
.savings-tag{ background:#fff1f3; color:#b91c1c; font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; }
.offer-tags{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px; }
.offer{ background:#fff1f3; color:#b91c1c; padding:5px 12px; border-radius:999px; font-size:11px; font-weight:600; border:1px solid rgba(251,207,232,0.7); }

.price-analysis-card{ background:#fff; border-radius:16px; margin-bottom:16px; border:1px solid #e8e8e8; }
.price-analysis-header{ display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:linear-gradient(135deg,#f8f9fa,#fff); border-bottom:1px solid #e8e8e8; }
.category-comparison-card{ margin:20px; padding:20px; }
.category-comparison-header{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:16px; flex-wrap:wrap; }
.category-comparison-title{ display:flex; align-items:center; gap:8px; font-size:20px; font-weight:900; color:#111827; }
body.dark .category-comparison-title{ color:#f5f7ff; }
.category-comparison-subtitle{ color:#6b7280; font-size:13px; margin-top:6px; }
.comparison-totals{ display:grid; grid-template-columns:repeat(2,minmax(120px,1fr)); gap:10px; min-width:260px; }
.comparison-total{ background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
body.dark .comparison-total{ background:#1f2435; border-color:#29304b; }
.comparison-label{ color:#6b7280; font-size:12px; font-weight:700; margin-bottom:4px; }
.comparison-value{ color:#111827; font-size:20px; font-weight:900; }
body.dark .comparison-value{ color:#f5f7ff; }
.category-comparison-chart{ height:320px; }
.category-breakdown-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:10px; margin-top:16px; }
.category-breakdown-item{ background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
body.dark .category-breakdown-item{ background:#1f2435; border-color:#29304b; }
.category-breakdown-name{ font-weight:800; margin-bottom:8px; color:#111827; }
body.dark .category-breakdown-name{ color:#f5f7ff; }
.category-breakdown-line{ display:flex; justify-content:space-between; gap:8px; color:#6b7280; font-size:13px; margin-top:4px; }
.category-breakdown-line strong{ color:#111827; }
body.dark .category-breakdown-line strong{ color:#f5f7ff; }
.rec-card{ background:linear-gradient(135deg,#ff3859,#ff6b6b); color:white; padding:12px 16px; border-radius:12px; margin:12px; }
.rec-title{ font-size:12px; opacity:0.9; margin-bottom:4px; }
.rec-text{ font-size:16px; font-weight:800; margin-bottom:4px; }
.rec-sub{ font-size:11px; opacity:0.8; }
.time-badges{ display:flex; gap:12px; margin-top:8px; }
.time-badge{ font-size:11px; padding:4px 12px; border-radius:20px; background:#f0f0f0; color:#666; }
.time-badge.bad{ background:#ffebee; color:#e53935; }
.time-badge.good{ background:#e8f5e9; color:#2e7d32; }
.stats-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:12px; padding:12px; }
.stat-card{ background:#f8f9fa; padding:10px; border-radius:12px; text-align:center; }
.stat-label{ font-size:11px; color:#888; margin-bottom:4px; }
.stat-value{ font-size:18px; font-weight:800; color:#ff3859; }
.price-chart{ padding:12px; background:#f8f9fa; border-radius:12px; margin:0 12px 12px; }
.chart-buttons{ display:flex; gap:8px; }
.time-btn{ padding:4px 12px; border-radius:16px; border:none; background:#e8e8e8; font-size:11px; cursor:pointer; }
.time-btn.active{ background:#ff3859; color:white; }
.chart-container{ position:relative; height:120px; margin-top:12px; display:flex; align-items:flex-end; gap:4px; }
.chart-bar{ flex:1; background:linear-gradient(180deg,#ff3859,#ff9800); border-radius:4px 4px 0 0; transition:0.3s; position:relative; cursor:pointer; }
.chart-bar:hover{ opacity:0.8; transform:scaleY(1.02); }
.chart-bar:hover::after{ content:attr(data-price); position:absolute; bottom:100%; left:50%; transform:translateX(-50%); background:#333; color:white; padding:2px 6px; border-radius:4px; font-size:10px; white-space:nowrap; margin-bottom:4px; }

.platform-compare-card{ background:#f8f9fa; border-radius:14px; margin-bottom:16px; border:1px solid #e8e8e8; }
.platform-compare-header{ display:flex; align-items:center; justify-content:space-between; padding:10px 14px; cursor:pointer; font-size:13px; font-weight:700; color:#333; }
.platform-compare-header .best-label{ background:#ff3859; color:#fff; font-size:11px; padding:3px 8px; border-radius:20px; font-weight:600; animation:pulse 2s infinite; }
@keyframes pulse{ 0%{box-shadow:0 0 0 0 rgba(255,56,89,0.4);} 70%{box-shadow:0 0 0 6px rgba(255,56,89,0);} 100%{box-shadow:0 0 0 0 rgba(255,56,89,0);} }
.platform-rows{ padding:6px 8px 10px; display:flex; flex-direction:column; gap:4px; }
.platform-row{ display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:10px; background:rgba(0,0,0,0.02); }
.platform-row.best-price{ background:linear-gradient(135deg,rgba(255,56,89,0.08),rgba(255,152,0,0.08)); border:1px solid rgba(255,56,89,0.2); animation:glowBest 1.5s infinite alternate; }
@keyframes glowBest{ 0%{box-shadow:0 0 2px rgba(255,56,89,0.3);} 100%{box-shadow:0 0 12px rgba(255,56,89,0.4);} }
.platform-left{ display:flex; align-items:center; gap:8px; }
.platform-logo{ width:24px; height:24px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; flex-shrink:0; }
.platform-label{ font-size:13px; color:#555; font-weight:500; }
.platform-price{ font-size:14px; font-weight:700; }
.best-price .platform-price{ color:#ff3859; font-size:16px; }
.best-price-tag{ font-size:10px; background:#ff3859; color:#fff; padding:2px 6px; border-radius:10px; font-weight:700; margin-left:4px; }
.delivery-time{ font-size:11px; color:#888; }
.card-buttons{ display:flex; gap:10px; margin-top:12px; }
.add-btn{ flex:1; padding:12px; border:none; border-radius:12px; background:linear-gradient(135deg,#ff3859,#ff6b6b); color:#fff; font-weight:700; cursor:pointer; font-size:14px; position:relative; overflow:hidden; }
.add-btn::before{ content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent); transition:0.5s; }
.add-btn:hover::before{ left:100%; }
.add-btn:hover{ background:linear-gradient(135deg,#e0003a,#ff4040); transform:translateY(-2px); box-shadow:0 6px 14px rgba(255,56,89,0.4); }
.wishlist-btn{ width:52px; min-width:52px; height:52px; border:1.5px solid rgba(226,232,240,0.95); border-radius:16px; background:#fff; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; transition:all 0.25s ease; }
.wishlist-btn:hover{ border-color:#ff7a9f; background:#fff3f4; transform:scale(1.06); }

.page{ padding:36px 30px 42px; min-height:82vh; animation:fadeIn 0.45s ease both; }
@keyframes fadeIn{ from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:translateY(0);} }
.page-title{ font-size:32px; font-weight:900; margin-bottom:28px; letter-spacing:-0.02em; }
.cart-item{ display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.96); padding:20px; border-radius:22px; margin-bottom:16px; box-shadow:0 18px 40px rgba(15,23,42,0.06); }
.cart-total{ background:rgba(255,255,255,0.96); padding:24px; border-radius:24px; margin-top:18px; box-shadow:0 18px 40px rgba(15,23,42,0.06); }
.cart-total-row{ display:flex; justify-content:space-between; padding:10px 0; }
.cart-total-row.final{ border-top:1px dashed rgba(226,232,240,0.9); margin-top:12px; padding-top:16px; font-size:18px; font-weight:800; }
.cart-checkout-btn{ width:100%; margin-top:20px; padding:18px; background:linear-gradient(135deg,#ff6a00,#ffd100); color:#111; border:none; border-radius:18px; font-weight:800; cursor:pointer; box-shadow:0 16px 28px rgba(255,136,0,0.24); }
.cart-checkout-btn:hover{ transform:translateY(-1px); }
.bottom-nav{ position:fixed; bottom:0; left:0; right:0; background:rgba(255,255,255,0.96); display:flex; justify-content:space-around; padding:12px 0 16px; box-shadow:0 -12px 32px rgba(15,23,42,0.08); z-index:1000; backdrop-filter:blur(14px); }
.bottom-item{ display:flex; flex-direction:column; align-items:center; font-size:12px; font-weight:600; cursor:pointer; color:#6b7280; gap:4px; transition:all 0.25s ease; }
.bottom-item.active, .bottom-item:hover{ color:#ff3859; transform:translateY(-2px); }
.footer{ margin-top:40px; padding:44px; background:#111; color:#fff; text-align:center; border-radius:30px; }
.footer h2{ font-size:28px; font-weight:900; background:linear-gradient(135deg,#ff3859,#ff9800); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:14px; }
.footer-platforms{ display:flex; justify-content:center; gap:24px; margin-top:24px; flex-wrap:wrap; }
.empty-state{ text-align:center; padding:70px 20px; color:#8b95a1; }
.empty-state .empty-icon{ font-size:72px; margin-bottom:18px; animation:float 3s infinite; }
@keyframes float{ 0%{transform:translateY(0px);} 50%{transform:translateY(-10px);} 100%{transform:translateY(0px);} }

.login-card{ background:rgba(255,255,255,0.96); border-radius:32px; padding:42px 36px; max-width:520px; margin:48px auto; box-shadow:0 28px 60px rgba(15,23,42,0.12); border:1px solid rgba(255,255,255,0.8); }
.login-tabs{ display:flex; gap:24px; margin-bottom:32px; border-bottom:2px solid rgba(226,232,240,0.9); }
.login-tab{ padding:14px 0; font-size:19px; font-weight:700; cursor:pointer; color:#8b96a8; border-bottom:2px solid transparent; margin-bottom:-2px; transition:color 0.3s ease; }
.login-tab.active{ color:#ff3859; border-bottom-color:#ff3859; }
.login-input-group{ margin-bottom:22px; position:relative; }
.login-input{ width:100%; padding:16px 18px 16px 48px; border:1.5px solid rgba(226,232,240,0.95); border-radius:16px; font-size:15px; background:#fff; transition:all 0.25s ease; }
.login-input:focus{ border-color:#ff5e7a; outline:none; box-shadow:0 12px 28px rgba(255,56,89,0.1); }
.login-icon{ position:absolute; left:16px; top:50%; transform:translateY(-50%); color:#b0b8c8; width:20px; height:20px; }
.login-btn{ width:100%; padding:16px; background:linear-gradient(135deg,#ff6a00,#ffd100); color:#fff; border:none; border-radius:18px; font-size:16px; font-weight:800; cursor:pointer; transition:transform 0.25s ease, box-shadow 0.25s ease; }
.login-btn:hover{ transform:translateY(-2px); box-shadow:0 16px 32px rgba(255,136,0,0.2); }
.login-divider{ text-align:center; margin:26px 0; color:#9ca3af; font-size:14px; position:relative; }
.login-divider::before, .login-divider::after{ content:''; position:absolute; top:50%; width:40%; height:1px; background:#e5e7eb; }
.login-divider::before{ left:0; } .login-divider::after{ right:0; }
.guest-btn{ width:100%; padding:16px; background:#fff; border:1.5px solid rgba(226,232,240,0.95); border-radius:18px; font-size:16px; font-weight:700; cursor:pointer; color:#111; transition:background 0.25s ease, transform 0.25s ease; }
.guest-btn:hover{ background:#fef2f2; transform:translateY(-1px); }

.profile-details{ background:#fff; border-radius:20px; padding:30px; margin-bottom:16px; }
.profile-header{ display:flex; align-items:center; gap:20px; margin-bottom:24px; flex-wrap:wrap; }
.profile-avatar-lg{ width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,#ff3859,#ff9800); display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:800; color:#fff; }
.logout-btn{ padding:12px 24px; background:#ff3859; color:#fff; border:none; border-radius:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:8px; }

.address-card{ background:#fff; border-radius:16px; padding:16px; margin-bottom:12px; border:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:flex-start; }
.address-badge{ display:inline-block; background:#ff3859; color:white; font-size:11px; padding:2px 8px; border-radius:12px; margin-bottom:6px; }
.address-actions{ display:flex; gap:8px; }
.address-btn{ background:none; border:none; cursor:pointer; color:#ff3859; padding:4px; }

.order-card{ background:#fff; border-radius:16px; padding:16px; margin-bottom:12px; border:1px solid #e8e8e8; cursor:pointer; }
.order-card:hover{ transform:translateY(-2px); box-shadow:0 8px 16px rgba(0,0,0,0.1); }
.order-header{ display:flex; justify-content:space-between; margin-bottom:12px; }
.order-status{ font-size:12px; padding:4px 10px; border-radius:20px; background:#e8f5e9; color:#2e7d32; }
.order-status.shipped{ background:#e3f2fd; color:#1565c0; }
.order-status.processing{ background:#fff3e0; color:#ef6c00; }

.delivery-person-card{ background:#f8f9fa; border-radius:16px; padding:16px; margin-bottom:16px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.delivery-avatar{ width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#ff3859,#ff9800); display:flex; align-items:center; justify-content:center; font-size:28px; color:white; }

.payment-modal-overlay{ position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:2000; }
.payment-modal{ background:#fff; border-radius:24px; width:90%; max-width:500px; max-height:80vh; overflow-y:auto; padding:24px; }
.payment-options{ display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap; }
.payment-option{ flex:1; padding:12px; border:2px solid #e0e0e0; border-radius:12px; text-align:center; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
.payment-option.active{ border-color:#ff3859; background:#fff5f7; }
.card-input{ width:100%; padding:12px; border:1px solid #e0e0e0; border-radius:12px; margin-bottom:12px; }
.pay-btn{ width:100%; padding:14px; background:linear-gradient(135deg,#ff3859,#ff9800); color:white; border:none; border-radius:12px; font-weight:700; margin-top:16px; cursor:pointer; }

/* Order status timeline */
.order-timeline { display: flex; flex-direction: column; gap: 12px; margin: 20px 0; }
.timeline-step { display: flex; align-items: flex-start; gap: 12px; }
.timeline-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #e0e0e0; color: #888; flex-shrink: 0; }
.timeline-icon.active { background: #ff3859; color: white; }
.timeline-icon.completed { background: #4caf50; color: white; }
.timeline-content { flex: 1; }
.timeline-title { font-weight: 600; }
.timeline-desc { font-size: 13px; color: #6b7280; }

@media(max-width:768px){
  .hero{ padding:30px 24px; margin:12px; }
  .hero h1{ font-size:32px; }
  .search-box{ display:none; }
  .bottom-nav{ display:flex; }
  .page{ padding:20px 16px 90px; }
  .product-grid{ grid-template-columns:1fr; }
  .stats-grid{ grid-template-columns:1fr; }
}
`;

function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

/* ============================================================
   CONTEXTS
============================================================ */
const AppContext = createContext();
function useApp() { return useContext(AppContext); }
const AuthContext = createContext();
function useAuth() { return useContext(AuthContext); }

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Resetting invalid localStorage value for ${key}`, error);
    localStorage.removeItem(key);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to save ${key} to localStorage`, error);
  }
};

const getItemQty = item => Math.max(1, Number(item?.qty) || Number(item?.quantity) || 1);
const getItemPrice = item => Math.max(0, Number(item?.price) || 0);
const getItemOldPrice = item => Math.max(getItemPrice(item), Number(item?.oldPrice) || getItemPrice(item));

/* ============================================================
   PLATFORM CONFIG
============================================================ */
const PLATFORMS = {
  Amazon: { color: "#FF9900", bg: "#FFF3CD", text: "#7a4800", short: "Az", delivery: "1-2 days" },
  Flipkart: { color: "#2874F0", bg: "#DCEEFF", text: "#0a3d8f", short: "Fk", delivery: "1-2 days" },
  Zepto: { color: "#8000FF", bg: "#F0E0FF", text: "#4d0099", short: "Zp", delivery: "10 mins" },
  Blinkit: { color: "#F8C200", bg: "#FFFBCC", text: "#7a6200", short: "Bl", delivery: "10 mins" },
  BigBasket: { color: "#84C225", bg: "#EAF5D0", text: "#3d6611", short: "BB", delivery: "2 hrs" },
  Instamart: { color: "#FC8019", bg: "#FFE8D1", text: "#7a3d08", short: "Im", delivery: "30 mins" }
};

/* ============================================================
   VEGETABLES DATA (English + Hindi + Kannada)
============================================================ */
const vegetablesList = [
  { en: "Carrot", hi: "गाजर", kn: "ಗಜ್ಜರಿ", price: 40, oldPrice: 50, desc: "Sweet root vegetable" },
  { en: "Potato", hi: "आलू", kn: "ಆಲೂಗಡ್ಡೆ", price: 30, oldPrice: 40, desc: "Staple tuber" },
  { en: "Tomato", hi: "टमाटर", kn: "ಟೊಮೆಟೊ", price: 35, oldPrice: 45, desc: "Juicy fruit" },
  { en: "Onion", hi: "प्याज", kn: "ಈರುಳ್ಳಿ", price: 25, oldPrice: 35, desc: "Pungent bulb" },
  { en: "Cabbage", hi: "पत्ता गोभी", kn: "ಎಲೆಕೋಸು", price: 30, oldPrice: 40, desc: "Leafy vegetable" },
  { en: "Cauliflower", hi: "फूलगोभी", kn: "ಹೂಕೋಸು", price: 45, oldPrice: 60, desc: "Flower vegetable" },
  { en: "Spinach", hi: "पालक", kn: "ಪಾಲಕ್", price: 20, oldPrice: 30, desc: "Leafy green" },
  { en: "Cucumber", hi: "खीरा", kn: "ಸೌತೆಕಾಯಿ", price: 25, oldPrice: 35, desc: "Cooling vegetable" },
  { en: "Broccoli", hi: "हरी फूलगोभी", kn: "ಹಸಿರು ಹೂಕೋಸು", price: 80, oldPrice: 100, desc: "Nutrient-dense" }
];

/* ============================================================
   GENERATE PRODUCTS (160+ items) – FIXED DATA CONSISTENCY
============================================================ */
const categoriesList = ["All", "Mobiles", "Fashion", "Electronics", "Grocery", "Beauty", "Home & Kitchen", "Vegetables"];

const productNames = {
  Mobiles: ["iPhone 15 Pro Max", "Samsung S24 Ultra", "Google Pixel 8 Pro", "OnePlus 12", "Xiaomi 14", "Vivo X100"],
  Fashion: ["Nike Air Max", "Adidas Ultraboost", "Levi's 501", "Zara Jacket", "H&M Hoodie", "Puma RS-X"],
  Electronics: ["Sony WH-1000XM5", "Apple AirPods Pro", "Bose QC45", "JBL Flip 6", "LG OLED TV", "iPad Pro"],
  Grocery: ["Tata Salt", "Amul Butter", "Basmati Rice", "Fortune Oil", "Maggi Noodles", "Red Label Tea"],
  Beauty: ["L'Oréal Serum", "Cetaphil Cleanser", "Nivea Cream", "Lakmé Foundation", "Maybelline Fit Me", "Sugar Lipstick"],
  "Home & Kitchen": ["Prestige Cooker", "Philips Air Fryer", "Wakefit Mattress", "Borosil Set", "Milton Bottle", "Bajaj Mixer"]
};

const products = [];
let idCounter = 1;

// Generate non-vegetable categories
for (const cat of categoriesList.slice(1, -1)) {
  const names = productNames[cat] || productNames["Electronics"];
  for (let i = 0; i < 8; i++) {
    const name = names[i % names.length];
    let basePrice;
    if (cat === "Mobiles") basePrice = 30000 + i * 5000;
    else if (cat === "Fashion") basePrice = 1000 + i * 200;
    else if (cat === "Electronics") basePrice = 5000 + i * 1500;
    else if (cat === "Grocery") basePrice = 50 + i * 15;
    else if (cat === "Beauty") basePrice = 300 + i * 30;
    else basePrice = 2000 + i * 300;
    
    // Consistent pricing: oldPrice is 20% higher, price is the discounted one
    const oldPrice = Math.round(basePrice * 1.2);
    const price = basePrice;
    const rating = 3.5 + (i % 15) / 10;
    const reviews = 500 + i * 200;
    const delivery = cat === "Grocery" ? "10 mins" : "1-2 days";
    const discountPercent = Math.round((oldPrice - price) / oldPrice * 100);
    const discount = `${discountPercent}% OFF`;
    const offers = ["No Cost EMI", "Bank Offer"];
    
    // Competitor prices: realistic, with one best platform
    const compare = {};
    const platformKeys = Object.keys(PLATFORMS);
    const bestPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
    for (const platform of platformKeys) {
      if (platform === bestPlatform) {
        compare[platform] = Math.round(price * 0.9);
      } else {
        compare[platform] = Math.round(price * (0.92 + Math.random() * 0.2));
      }
    }
    
    // Generate 12-month price history ending at current price
    const priceHistory = [];
    const today = new Date();
    let current = price;
    for (let j = 0; j < 12; j++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - (11 - j));
      // Random walk with mean reversion toward price
      const noise = (Math.random() - 0.5) * 0.15;
      current = current * (1 + noise);
      current = Math.max(current, price * 0.75);
      current = Math.min(current, oldPrice * 0.95);
      current = Math.round(current);
      priceHistory.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        price: current
      });
    }
    // Ensure last entry equals current price
    priceHistory[priceHistory.length - 1].price = price;
    
    const pricesOnly = priceHistory.map(p => p.price);
    const avgPrice = Math.round(pricesOnly.reduce((a, b) => a + b, 0) / pricesOnly.length);
    const lowestPrice = Math.min(...pricesOnly);
    const highestPrice = Math.max(...pricesOnly);
    
    // Deal score: based on discount, competitor advantage, and price vs average
    const competitorPrices = Object.values(compare).filter(v => v !== undefined);
    const avgComp = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
    const compAdvantage = (avgComp - price) / avgComp;
    let dealScore = (discountPercent / 100) * 0.5 + compAdvantage * 0.3 + (price < avgPrice ? 0.2 : 0);
    dealScore = Math.min(1, Math.max(0, dealScore));
    const isGoodTime = dealScore > 0.6;
    const buyRecommendation = isGoodTime ? "Go Ahead & Buy now" : "Wait for better price";
    const recommendationSub = isGoodTime ? "Optimal price point" : "Price may drop further";
    
    products.push({
      id: idCounter++,
      category: cat,
      name,
      desc: "Premium quality • Best seller",
      price,
      oldPrice,
      rating,
      reviews,
      delivery,
      discount,
      offers,
      compare,
      icon: cat === "Mobiles" ? "📱" : cat === "Fashion" ? "👕" : cat === "Electronics" ? "💻" : cat === "Grocery" ? "🥦" : cat === "Beauty" ? "💄" : "🏠",
      bg: `linear-gradient(135deg, ${cat === "Mobiles" ? "#fbbf24" : cat === "Fashion" ? "#f472b6" : cat === "Electronics" ? "#60a5fa" : cat === "Grocery" ? "#4ade80" : cat === "Beauty" ? "#fbcfe8" : "#a855f7"}, ${cat === "Mobiles" ? "#fb923c" : cat === "Fashion" ? "#ec4899" : cat === "Electronics" ? "#3b82f6" : cat === "Grocery" ? "#22c55e" : cat === "Beauty" ? "#f9a8d4" : "#7c3aed"})`,
      priceHistory,
      avgPrice,
      lowestPrice,
      highestPrice,
      dealScore,
      buyRecommendation,
      recommendationSub,
      isGoodTime
    });
  }
}

// Generate Vegetables with Kannada support
for (const veg of vegetablesList) {
  const price = veg.price;
  const oldPrice = veg.oldPrice;
  const rating = 4 + Math.random() * 0.8;
  const reviews = Math.floor(Math.random() * 20000) + 500;
  const delivery = "10 mins - 1 day";
  const discountPercent = Math.round((oldPrice - price) / oldPrice * 100);
  const discount = `${discountPercent}% OFF`;
  const offers = ["Fresh Stock", "Free Delivery"];
  const compare = {};
  const platformKeys = Object.keys(PLATFORMS);
  const bestPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
  for (const platform of platformKeys) {
    if (platform === bestPlatform) {
      compare[platform] = Math.round(price * 0.9);
    } else {
      compare[platform] = Math.round(price * (0.92 + Math.random() * 0.2));
    }
  }
  
  // Generate price history
  const priceHistory = [];
  const today = new Date();
  let current = price;
  for (let j = 0; j < 12; j++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - (11 - j));
    const noise = (Math.random() - 0.5) * 0.15;
    current = current * (1 + noise);
    current = Math.max(current, price * 0.75);
    current = Math.min(current, oldPrice * 0.95);
    current = Math.round(current);
    priceHistory.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      price: current
    });
  }
  priceHistory[priceHistory.length - 1].price = price;
  
  const pricesOnly = priceHistory.map(p => p.price);
  const avgPrice = Math.round(pricesOnly.reduce((a, b) => a + b, 0) / pricesOnly.length);
  const lowestPrice = Math.min(...pricesOnly);
  const highestPrice = Math.max(...pricesOnly);
  
  const competitorPrices = Object.values(compare).filter(v => v !== undefined);
  const avgComp = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  const compAdvantage = (avgComp - price) / avgComp;
  let dealScore = (discountPercent / 100) * 0.5 + compAdvantage * 0.3 + (price < avgPrice ? 0.2 : 0);
  dealScore = Math.min(1, Math.max(0, dealScore));
  const isGoodTime = dealScore > 0.6;
  const buyRecommendation = isGoodTime ? "Go Ahead & Buy now" : "Wait for better price";
  const recommendationSub = isGoodTime ? "Optimal price point" : "Price may drop further";
  
  products.push({
    id: idCounter++,
    category: "Vegetables",
    name: `${veg.en} (${veg.hi} / ${veg.kn})`,
    desc: `${veg.desc} | हिंदी: ${veg.hi} | ಕನ್ನಡ: ${veg.kn}`,
    price,
    oldPrice,
    rating,
    reviews,
    delivery,
    discount,
    offers,
    compare,
    icon: "🥕",
    bg: "linear-gradient(135deg, #16a34a, #15803d)",
    priceHistory,
    avgPrice,
    lowestPrice,
    highestPrice,
    dealScore,
    buyRecommendation,
    recommendationSub,
    isGoodTime
  });
}

/* ============================================================
   PRICE ANALYSIS COMPONENT
============================================================ */
function PriceAnalysis({ product }) {
  const [range, setRange] = useState("max");
  const getPrices = () => {
    if (range === "1m") return product.priceHistory.slice(-4);
    if (range === "3m") return product.priceHistory.slice(-8);
    return product.priceHistory;
  };
  const disp = getPrices();
  const maxP = Math.max(...disp.map(p => p.price));
  const minP = Math.min(...disp.map(p => p.price));
  const height = (price) => ((price - minP) / (maxP - minP)) * 80 + 20;
  const isGood = product.isGoodTime;
  return (
    <div className="price-analysis-card">
      <div className="price-analysis-header">
        <h4><BarChart3 size={14} color="#ff3859" /> Should you buy now?</h4>
        <div className="chart-buttons">
          <button className={`time-btn ${range === "1m" ? "active" : ""}`} onClick={() => setRange("1m")}>1M</button>
          <button className={`time-btn ${range === "3m" ? "active" : ""}`} onClick={() => setRange("3m")}>3M</button>
          <button className={`time-btn ${range === "max" ? "active" : ""}`} onClick={() => setRange("max")}>Max</button>
        </div>
      </div>
      <div className="rec-card">
        <div className="rec-title">Our Recommendation</div>
        <div className="rec-text">{product.buyRecommendation}</div>
        <div className="rec-sub">{product.recommendationSub}</div>
        <div className="time-badges">
          <span className="time-badge bad">Bad Time</span>
          <span className={`time-badge ${isGood ? "good" : "bad"}`}>{isGood ? "Good Time" : "Wait"}</span>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Highest</div><div className="stat-value">₹{product.highestPrice.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Average</div><div className="stat-value">₹{product.avgPrice.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Lowest</div><div className="stat-value">₹{product.lowestPrice.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Current</div><div className="stat-value" style={{ color: isGood ? "#2e7d32" : "#ff3859" }}>₹{product.price.toLocaleString()}</div></div>
      </div>
      <div className="price-chart">
        <div className="chart-title"><span>Price History</span><span style={{ fontSize:"10px", color:"#888" }}>⬇️ Hover on bars</span></div>
        <div className="chart-container">
          {disp.map((item, idx) => (
            <div key={idx} className="chart-bar" data-price={`₹${item.price.toLocaleString()}`} style={{ height: `${height(item.price)}%` }} />
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"8px", fontSize:"9px", color:"#888" }}>
          {disp.map((item, idx) => <span key={idx}>{item.date}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HEADER (unchanged)
============================================================ */
function Header() {
  const { cart, darkMode, setDarkMode, setSearch, setSelectedCategory } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setSearch(value);
    setSelectedCategory("All");
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>BharatMart</div>
        <div className="search-box">
          <input
            className="search-input"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>
        <div className="nav-icons">
          <div 
            className="toggle-switch" 
            onClick={() => setDarkMode(!darkMode)} 
            style={{ background: darkMode ? '#ff3859' : '#d1d5db', cursor: 'pointer' }}
          >
            <div 
              className="toggle-knob" 
              style={{ transform: darkMode ? 'translateX(24px)' : 'translateX(0px)' }}
            >
              {darkMode ? <Sun size={14} color="#ff6a00" /> : <Moon size={14} color="#6b7280" />}
            </div>
          </div>
          <div className="icon-btn" onClick={() => navigate("/wishlist")} style={{ cursor: 'pointer' }}><Heart size={18} /></div>
          <div className="icon-btn" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}><User size={18} /></div>
          <div className="icon-btn" onClick={() => navigate("/cart")} style={{ cursor: 'pointer', position: 'relative' }}>
            <ShoppingCart size={18} />
            {cart.length > 0 && <div className="cart-badge">{cart.length}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div>
        <div className="hero-tag"><Zap size={14} /> Live Price Comparison</div>
        <h1>India's Best<br /><span>Price Compare</span><br />Engine 🔥</h1>
        <p>Compare prices across Amazon, Flipkart, Zepto, Blinkit, BigBasket & Swiggy Instamart instantly</p>
        <div className="hero-stats">
          <div className="hero-stat"><strong>6+</strong><span>Platforms</span></div>
          <div className="hero-stat"><strong>160+</strong><span>Products</span></div>
          <div className="hero-stat"><strong>₹500Cr+</strong><span>Saved</span></div>
        </div>
        <button onClick={() => navigate("/")}>Shop & Save Now →</button>
      </div>
      <div className="hero-banner">
        <div className="ad-badge">AD</div>
        <div className="banner-image">
          <div className="banner-text">
            <div className="ad-title">Nova 2 Ultra 5G</div>
            <div className="ad-sub">From ₹16,999 • AMOLED Display • Epic Sale</div>
          </div>
          <svg style={{position:'absolute', right:'30px', bottom:'0px', height:'260px', width:'auto'}} viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#444', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#0d0d0d', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="displayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#1a3a52', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#0a0e1a', stopOpacity:1}} />
              </linearGradient>
              <filter id="phoneShadow">
                <feDropShadow dx="0" dy="10" stdDeviation="4" floodOpacity="0.35" />
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#phoneShadow)">
              <rect x="15" y="10" width="170" height="380" rx="25" fill="url(#phoneGrad)" stroke="#666" strokeWidth="2"/>
              <rect x="28" y="28" width="144" height="320" rx="18" fill="#0f1724" stroke="#888" strokeWidth="1.5"/>
              <rect x="35" y="45" width="130" height="280" rx="12" fill="url(#displayGrad)"/>
              <circle cx="100" cy="65" r="10" fill="#555" opacity="0.8"/>
              <rect x="95" y="60" width="10" height="3" rx="1.5" fill="#888"/>
              <g filter="url(#glow)">
                <text x="100" y="160" fontSize="32" fontWeight="bold" fill="#ff9800" textAnchor="middle" fontFamily="Arial">Nova</text>
              </g>
              <text x="100" y="195" fontSize="18" fill="#fff" textAnchor="middle" fontFamily="Arial">Ultra 5G</text>
              <text x="100" y="225" fontSize="11" fill="#ffb84d" textAnchor="middle" fontFamily="Arial">AMOLED • 120Hz</text>
              <rect x="28" y="340" width="144" height="40" rx="12" fill="#1a1a2e" stroke="#666" strokeWidth="1.5"/>
              <circle cx="100" cy="360" r="6" fill="#555"/>
              <rect x="30" y="342" width="140" height="36" rx="11" fill="rgba(255,152,0,0.05)" stroke="rgba(255,152,0,0.1)" strokeWidth="1"/>
            </g>
          </svg>
        </div>
        <div className="banner-controls">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </section>
  );
}

function PlatformStrip() {
  return (
    <div style={{ display:"flex", gap:"12px", padding:"0 20px 20px", overflowX:"auto" }}>
      {Object.entries(PLATFORMS).map(([name, p]) => (
        <div key={name} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#fff", padding:"10px 18px", borderRadius:"50px", whiteSpace:"nowrap", border:"1px solid #e8e8e8", fontSize:"14px", fontWeight:"600", flexShrink:0, cursor:"pointer", transition:"all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}>
          <div style={{ width:"22px", height:"22px", borderRadius:"6px", background:p.bg, color:p.text, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"800" }}>{p.short}</div>
          {name}
        </div>
      ))}
    </div>
  );
}

function Categories() {
  const { selectedCategory, setSelectedCategory } = useApp();
  const icons = { All:"🛒", Mobiles:"📱", Fashion:"👕", Electronics:"💻", Grocery:"🥦", Beauty:"💄", "Home & Kitchen":"🏠", Vegetables:"🥕" };
  return (
    <section className="categories">
      <div className="section-header"><h2 className="section-title">Categories</h2></div>
      <div className="category-grid">
        {categoriesList.map((cat, idx) => (
          <div key={idx} className={`category-card ${selectedCategory === cat ? "active" : ""}`} onClick={() => setSelectedCategory(cat)}>
            <div className="category-icon">{icons[cat] || "🛍️"}</div>
            <h3>{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlatformCompare({ compare }) {
  const [expanded, setExpanded] = useState(false);
  const available = Object.entries(compare).filter(([,v]) => v !== null);
  if (available.length === 0) return null;
  const minPrice = Math.min(...available.map(([,v]) => v));
  const best = available.find(([,v]) => v === minPrice)?.[0];
  const display = expanded ? available : available.slice(0,3);
  return (
    <div className="platform-compare-card">
      <div className="platform-compare-header" onClick={() => setExpanded(!expanded)}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}><TrendingUp size={15} color="#ff3859" /><span>Compare Prices</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>{best && <span className="best-label">Best: {best}</span>}{available.length > 3 && (expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</div>
      </div>
      <div className="platform-rows">
        {display.map(([platform, price]) => {
          const p = PLATFORMS[platform];
          const isBest = price === minPrice;
          return (
            <div key={platform} className={`platform-row ${isBest ? "best-price" : ""}`}>
              <div className="platform-left"><div className="platform-logo" style={{ background:p.bg, color:p.text }}>{p.short}</div><div><div className="platform-label">{platform}</div><div className="delivery-time">⚡ {p.delivery}</div></div></div>
              <div style={{ display:"flex", alignItems:"center", gap:"4px" }}><span className="platform-price">₹{price.toLocaleString()}</span>{isBest && <span className="best-price-tag">BEST</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DealScoring({ product }) {
  const score = product.dealScore;
  return (
    <div className="offer" style={{ background: score > 0.6 ? '#2e7d32' : '#ff9800', color: 'white', fontWeight: 'bold' }}>
      Deal Score: {(score * 100).toFixed(0)}% {score > 0.6 ? '🔥 Hot Deal!' : '👍 Good'}
    </div>
  );
}

function PriceIntelligence({ product }) {
  const prediction = product.price * (1 + (Math.random() - 0.5) * 0.05);
  const confidence = 0.7 + Math.random() * 0.2;
  const optimalTiming = product.isGoodTime ? "Buy now – price is low" : "Wait – price may drop further";
  return (
    <div className="price-analysis-card" style={{ marginTop: '8px' }}>
      <div className="price-analysis-header">
        <span><TrendingDown size={14} /> Price Intelligence</span>
      </div>
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="stat-card"><div className="stat-label">Predicted Price</div><div className="stat-value">₹{Math.round(prediction).toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Confidence</div><div className="stat-value">{(confidence * 100).toFixed(0)}%</div></div>
      </div>
      <div className="rec-card" style={{ margin: '8px', padding: '8px' }}>
        <div className="rec-sub">Optimal timing: {optimalTiming}</div>
      </div>
    </div>
  );
}

function usePersonalization() {
  const [userPreferences, setUserPreferences] = useState(() =>
    readStorage('bm_preferences', { categories: [], priceRange: [0, 100000], brands: [] })
  );
  const trackInteraction = (product) => {
    const updated = { ...userPreferences };
    if (!updated.categories.includes(product.category)) updated.categories.push(product.category);
    writeStorage('bm_preferences', updated);
    setUserPreferences(updated);
  };
  return { userPreferences, trackInteraction };
}

function PersonalizedRecommendations() {
  const { wishlist, cart } = useApp();
  const { userPreferences } = usePersonalization();
  const [recs, setRecs] = useState([]);
  useEffect(() => {
    const liked = [...wishlist, ...cart];
    if (liked.length === 0 && userPreferences.categories.length === 0) return;
    const categories = liked.map(l => l.category).concat(userPreferences.categories);
    const uniqueCats = [...new Set(categories)];
    const recProducts = products.filter(p => uniqueCats.includes(p.category)).slice(0, 4);
    setRecs(recProducts);
  }, [wishlist, cart, userPreferences]);
  if (!recs.length) return null;
  return (
    <section className="products">
      <div className="section-header"><h2 className="section-title"><Heart size={18} /> Just for You</h2></div>
      <div className="product-grid">{recs.map(p => <ProductCard key={p.id} item={p} />)}</div>
    </section>
  );
}

function AnalyticsDashboard() {
  const { cart } = useApp();
  if (cart.length === 0) return null;

  const categoryTotals = cart.reduce((totals, item) => {
    const category = item.category || 'Other';
    const qty = getItemQty(item);
    const spending = getItemPrice(item) * qty;
    const saving = Math.max(getItemOldPrice(item) - getItemPrice(item), 0) * qty;

    if (!totals[category]) {
      totals[category] = { spending: 0, saving: 0, items: 0 };
    }

    totals[category].spending += spending;
    totals[category].saving += saving;
    totals[category].items += qty;
    return totals;
  }, {});

  const comparisonRows = Object.entries(categoryTotals)
    .map(([category, totals]) => ({ category, ...totals }))
    .sort((a, b) => b.spending + b.saving - (a.spending + a.saving));

  const labels = comparisonRows.map(row => row.category);
  const totalSpending = comparisonRows.reduce((sum, row) => sum + row.spending, 0);
  const totalSaving = comparisonRows.reduce((sum, row) => sum + row.saving, 0);

  const spendingData = {
    labels,
    datasets: [
      {
        data: comparisonRows.map(row => row.spending),
        backgroundColor: ['#ff3859', '#ff9800', '#4caf50', '#2196f3', '#8b5cf6', '#14b8a6', '#f59e0b', '#64748b'],
        borderWidth: 0
      }
    ]
  };

  const comparisonData = {
    labels,
    datasets: [
      {
        label: 'Spending',
        data: comparisonRows.map(row => row.spending),
        backgroundColor: '#ff3859',
        borderRadius: 8,
        barThickness: 28
      },
      {
        label: 'Saving',
        data: comparisonRows.map(row => row.saving),
        backgroundColor: '#22c55e',
        borderRadius: 8,
        barThickness: 28
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 16 }
      },
      tooltip: {
        callbacks: {
          label: context => `${context.dataset.label}: Rs.${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, minRotation: 0 }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `Rs.${Number(value).toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="price-analysis-card category-comparison-card">
      <div className="category-comparison-header">
        <div>
          <h3 className="category-comparison-title">
            <ChartNoAxesCombined size={20} /> Spending vs Saving by Category
          </h3>
          <p className="category-comparison-subtitle">
            Compare what you paid with the discount saved across product categories.
          </p>
        </div>
        <div className="comparison-totals">
          <div className="comparison-total">
            <div className="comparison-label">Total spending</div>
            <div className="comparison-value">Rs.{totalSpending.toLocaleString()}</div>
          </div>
          <div className="comparison-total">
            <div className="comparison-label">Total saving</div>
            <div className="comparison-value">Rs.{totalSaving.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="category-comparison-chart">
        <Bar data={comparisonData} options={chartOptions} />
      </div>

      <div className="category-breakdown-grid">
        {comparisonRows.map(row => (
          <div className="category-breakdown-item" key={row.category}>
            <div className="category-breakdown-name">{row.category}</div>
            <div className="category-breakdown-line">
              <span>Spent</span>
              <strong>Rs.{row.spending.toLocaleString()}</strong>
            </div>
            <div className="category-breakdown-line">
              <span>Saved</span>
              <strong>Rs.{row.saving.toLocaleString()}</strong>
            </div>
            <div className="category-breakdown-line">
              <span>Items</span>
              <strong>{row.items}</strong>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '180px', marginTop: '18px' }}>
        <Doughnut data={spendingData} />
      </div>
    </div>
  );
}

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      if (Math.random() > 0.7) {
        const newNotif = { id: Date.now(), product: randomProduct.name, price: randomProduct.price, message: `Price dropped! Now ₹${randomProduct.price}` };
        setNotifications(prev => [newNotif, ...prev].slice(0, 5));
        toast.info(`🔔 ${newNotif.message}`);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, maxWidth: '300px' }}>
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div key={n.id} initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} style={{ background: 'white', padding: '12px', borderRadius: '12px', marginBottom: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Bell size={14} color="#ff3859" /> {n.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   AI BADGE COMPONENT (per product)
============================================================ */
function AIBadge({ product, onClick }) {
  return (
    <motion.div
      className="ai-badge"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sparkle className="sparkle" size={12} />
      <span>AI Advice</span>
    </motion.div>
  );
}

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm your AI shopping assistant. You can ask about prices, delivery, or product recommendations!" }]);
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{ position: 'fixed', bottom: '90px', right: '20px', width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff3859, #ff9800)', border: 'none', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={28} /></button>
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '160px', right: '20px', width: '380px', height: '520px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 1001, overflow: 'hidden' }}>
          <div style={{ padding: '12px', background: 'linear-gradient(135deg, #ff3859, #ff9800)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span><Bot size={18} /> AI Shopping Assistant</span><X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} /></div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', background: '#f9f9f9' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '12px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                <div style={{ display: 'inline-block', background: msg.role === 'user' ? '#ff3859' : '#e0e0e0', color: msg.role === 'user' ? 'white' : '#333', padding: '8px 12px', borderRadius: '12px', maxWidth: '80%' }}><ReactMarkdown>{msg.content}</ReactMarkdown></div>
              </div>
            ))}
            {loading && <div style={{ textAlign: 'left' }}><span style={{ background: '#e0e0e0', padding: '8px 12px', borderRadius: '12px' }}>Typing...</span></div>}
          </div>
          <div style={{ padding: '12px', borderTop: '1px solid #ddd', display: 'flex', gap: '8px' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Ask about products..." style={{ flex: 1, padding: '8px', borderRadius: '20px', border: '1px solid #ccc' }} />
            <button onClick={sendMessage} style={{ background: '#ff3859', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px' }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

function SmartDashboard() {
  const { cart, wishlist } = useApp();
  const [savingsGoal] = useState(10000);
  const totalSavings = cart.reduce((s,i)=>s+(i.oldPrice-i.price)*i.qty,0);
  return (
    <div className="profile-details" style={{ marginTop: '20px' }}>
      <h3><TrendingUp size={18} /> Your Smart Dashboard</h3>
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="stat-card"><div className="stat-label">Total Savings</div><div className="stat-value">₹{totalSavings.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Wishlist Items</div><div className="stat-value">{wishlist.length}</div></div>
      </div>
      <div className="rec-card" style={{ margin: '12px', padding: '12px' }}>
        <div className="rec-title">Savings Goal Progress</div>
        <div style={{ background: '#ddd', borderRadius: '20px', height: '20px', overflow: 'hidden', marginTop: '8px' }}>
          <div style={{ width: `${Math.min(100, (totalSavings/savingsGoal)*100)}%`, background: '#ff3859', height: '100%' }}></div>
        </div>
        <div className="rec-sub">₹{totalSavings.toLocaleString()} / ₹{savingsGoal.toLocaleString()}</div>
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD with AI Badge
============================================================ */
function ProductCard({ item }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const { trackInteraction } = usePersonalization();
  const isWishlisted = wishlist.find(p => p.id === item.id);
  const savings = item.oldPrice - item.price;
  const [quantity, setQuantity] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAddToCart = () => { 
    for(let i=0; i<quantity; i++) addToCart(item); 
    trackInteraction(item);
    setQuantity(1);
  };

  const handleAIAdvice = async () => {
    setAiLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const advice = [
        `🛍️ "${item.name}" is at a ${Math.round((item.oldPrice - item.price) / item.oldPrice * 100)}% discount!`,
        `📊 Current price ₹${item.price.toLocaleString()} is ${item.price < item.avgPrice ? 'below' : 'above'} average.`,
        `💡 Best platform: ${Object.entries(item.compare).filter(([,v]) => v !== null).sort((a,b) => a[1] - b[1])[0]?.[0] || 'Amazon'}`
      ].join('\n\n');
      toast.info(advice, { autoClose: 8000 });
    } catch (error) {
      toast.error('AI advice unavailable');
    }
    setAiLoading(false);
  };

  const isVegetable = item.category === "Vegetables";
  const kannadaText = isVegetable ? item.desc.split('|').pop()?.trim() || '' : '';

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <div className="product-image" style={{ background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '90px', height: '240px', color: 'white' }}>{item.icon}</div>
        <div className="discount-badge">{item.discount}</div>
        <div className="delivery-badge">⚡ {item.delivery}</div>
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 5 }}>
          <AIBadge product={item} onClick={handleAIAdvice} />
        </div>
      </div>
      <div className="product-content">
        <h3 className="product-title">{item.name}</h3>
        {isVegetable && kannadaText && (
          <div className="product-desc kannada-text" style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
            {kannadaText}
          </div>
        )}
        <p className="product-desc">{item.desc}</p>
        <div className="rating"><div className="rating-score"><Star size={12} fill="#2e7d32" color="#2e7d32" />{item.rating.toFixed(1)}</div><span className="review-count">({item.reviews.toLocaleString()} reviews)</span></div>
        <div className="price"><span className="current-price">₹{item.price.toLocaleString()}</span><span className="old-price">₹{item.oldPrice.toLocaleString()}</span><span className="savings-tag">Save ₹{savings.toLocaleString()}</span></div>
        <div className="offer-tags">{item.offers.map((o,i) => <span className="offer" key={i}>{o}</span>)}</div>
        <PriceIntelligence product={item} />
        <DealScoring product={item} />
        <PriceAnalysis product={item} />
        <PlatformCompare compare={item.compare} />
        <div className="card-buttons">
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flex: 1 }}>
            <button className="icon-btn" onClick={() => setQuantity(Math.max(1, quantity-1))} style={{ width: '32px', height: '32px' }}><Minus size={14} /></button>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
            <button className="icon-btn" onClick={() => setQuantity(quantity+1)} style={{ width: '32px', height: '32px' }}><Plus size={14} /></button>
            <button className="add-btn" onClick={handleAddToCart}>Add To Cart</button>
          </div>
          <button className="wishlist-btn" onClick={() => toggleWishlist(item)}>{isWishlisted ? "❤️" : "🤍"}</button>
          <button className="wishlist-btn" onClick={handleAIAdvice} style={{ fontSize: '14px', fontWeight: 'bold', background: aiLoading ? '#e0e0e0' : '#8b5cf6', color: 'white' }} disabled={aiLoading}>
            {aiLoading ? '⏳' : '🤖'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
/* ============================================================
   AUTH & APP PROVIDERS
============================================================ */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        if (!payload) throw new Error('Invalid token format');
        setUser(JSON.parse(atob(payload)));
      } catch (err) {
        console.error('Token error:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    writeStorage('user', userData);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// APP CONTEXT WITH ORDERS
// ============================================================
function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(() => readStorage('bm_orders', []));
  const [addresses, setAddresses] = useState(() => readStorage('bm_addresses', []));

  // Persist orders and addresses
  useEffect(() => {
    writeStorage('bm_orders', orders);
  }, [orders]);
  useEffect(() => {
    writeStorage('bm_addresses', addresses);
  }, [addresses]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const addToCart = (product, qty = 1) => {
    if (!product?.id) {
      toast.error('Unable to add this product');
      return;
    }
    const safeQty = Math.max(1, Number(qty) || 1);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing
        ? prev.map(item => item.id === product.id ? { ...item, qty: getItemQty(item) + safeQty } : item)
        : [...prev, { ...product, qty: safeQty }];
    });
    toast.success('✅ Added to cart!');
  };
  
  const toggleWishlist = (product) => {
    setWishlist(prev => prev.some(w => w.id === product.id) ? prev.filter(w => w.id !== product.id) : [...prev, product]);
  };

  // Order management
  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
    toast.success('🎉 Order placed successfully!');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus, statusUpdatedAt: new Date().toISOString() } : o
    ));
  };

  const clearCart = () => setCart([]);
  
  return (
    <AppContext.Provider value={{ 
      cart, setCart, wishlist, toggleWishlist, addToCart, 
      darkMode, setDarkMode, selectedCategory, setSelectedCategory, 
      search, setSearch,
      orders, addOrder, updateOrderStatus,
      addresses, setAddresses,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

/* ============================================================
   PAGE COMPONENTS
============================================================ */
function HomePage() {
  const { selectedCategory, search, cart, setCart, wishlist, toggleWishlist, addToCart } = useApp();
  
  const filteredProducts = products.filter(p => 
    (selectedCategory === "All" || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(search?.toLowerCase() || "") ||
     p.desc.toLowerCase().includes(search?.toLowerCase() || ""))
  );

  return (
    <>
      <Hero />
      <PlatformStrip />
      <Categories />
      <section className="products">
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))
          ) : (
            <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
              <div className="empty-icon">🔍</div>
              <p>No products found</p>
            </div>
          )}
        </div>
      </section>
      <PersonalizedRecommendations />
      <Footer />
      <BottomNav />
      <AIChat />
      <NotificationCenter />
    </>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const createToken = (userData) => `dummy.${btoa(JSON.stringify(userData))}.signature`;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fakePayload = { email };
      const fakeToken = createToken(fakePayload);
      login(fakePayload, fakeToken);
      toast.success('✅ Logged in successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('❌ Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('❌ Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const fakePayload = { name, email };
      const fakeToken = createToken(fakePayload);
      login(fakePayload, fakeToken);
      toast.success('✅ Account created successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('❌ Signup failed!');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="page">
      <div className="login-card" style={{ maxWidth: '420px', margin: '0 auto', padding: '36px', background: '#fff', borderRadius: '24px', boxShadow: '0 14px 50px rgba(15,23,42,0.12)' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => { setMode(tab); resetFields(); }}
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(226,232,240,0.95)',
                background: mode === tab ? '#ff3859' : '#f8fafc',
                color: mode === tab ? '#fff' : '#111827',
                fontWeight: mode === tab ? 700 : 600,
                cursor: 'pointer'
              }}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>
        <h2 style={{ marginBottom: '18px', fontSize: '26px', fontWeight: '800' }}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '10px' }}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '10px' }}
            required
          />
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 44px 12px 12px', border: '1px solid #ddd', borderRadius: '10px' }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {mode === 'signup' && (
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 44px 12px 12px', border: '1px solid #ddd', borderRadius: '10px' }}
                required
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: '#ff3859', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}
          >
            {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Create Account')}
          </button>
        </form>
        <p style={{ marginTop: '18px', color: '#6b7280', textAlign: 'center' }}>
          {mode === 'login' ? 'New here? Sign up to get started.' : 'Already have an account? Login now.'}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// CART PAGE WITH PLACE ORDER FLOW
// ============================================================
function CartPage() {
  const { cart, setCart, addresses, addOrder, clearCart } = useApp();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalSpend = cart.reduce((sum, item) => sum + getItemPrice(item) * getItemQty(item), 0);
  const totalSaved = cart.reduce((sum, item) => sum + (getItemOldPrice(item) - getItemPrice(item)) * getItemQty(item), 0);

  const handlePlaceOrder = () => {
    if (addresses.length === 0) {
      toast.error('Please add an address first');
      navigate('/address');
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    if (!paymentMode) {
      toast.error('Please select a payment method');
      return;
    }

    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      items: cart.map(item => ({ ...item, qty: getItemQty(item), total: getItemPrice(item) * getItemQty(item) })),
      total: totalSpend,
      address: selectedAddress,
      payment: paymentMode,
      status: 'Dispatched',
      statusUpdatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      rider: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        location: { lat: 12.9716, lng: 77.5946 },
      }
    };

    addOrder(order);
    clearCart();
    setOrderPlaced(true);
    setShowCheckout(false);
    toast.success('🎉 Order placed successfully!');
    navigate(`/track/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <h2 className="page-title">Shopping Cart</h2>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">Shopping Cart</h2>
      <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div><strong>{item.name}</strong><br />₹{getItemPrice(item)} x {getItemQty(item)}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: Math.max(1, getItemQty(i) - 1) } : i))} className="icon-btn">−</button>
              <button onClick={() => setCart(cart.map(i => i.id === item.id ? { ...i, qty: getItemQty(i) + 1 } : i))} className="icon-btn">+</button>
              <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="icon-btn"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        <AnalyticsDashboard />
        <div className="cart-total">
          <div className="cart-total-row final">Total: ₹{totalSpend.toLocaleString()}</div>
          <button className="cart-checkout-btn" onClick={() => setShowCheckout(true)}>Place Order</button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>Checkout</h3>
              <X size={24} style={{ cursor: 'pointer' }} onClick={() => setShowCheckout(false)} />
            </div>

            {/* Address Selection */}
            <h4>Select Delivery Address</h4>
            {addresses.length === 0 ? (
              <p>No addresses saved. <Link to="/address" style={{ color: '#ff3859' }}>Add one now</Link></p>
            ) : (
              <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '20px' }}>
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`address-card ${selectedAddress?.id === addr.id ? 'active' : ''}`}
                    style={{
                      cursor: 'pointer',
                      borderColor: selectedAddress?.id === addr.id ? '#ff3859' : '#e8e8e8',
                      background: selectedAddress?.id === addr.id ? '#fff5f7' : 'white'
                    }}
                    onClick={() => setSelectedAddress(addr)}
                  >
                    <div>
                      <div><strong>{addr.name}</strong> | {addr.phone}</div>
                      <div>{addr.address}, {addr.city} - {addr.zip}</div>
                    </div>
                    {selectedAddress?.id === addr.id && <CheckCircle size={20} color="#ff3859" />}
                  </div>
                ))}
              </div>
            )}

            {/* Payment Methods */}
            <h4>Payment Method</h4>
            <div className="payment-options">
              {['UPI', 'Cash', 'Card', 'Net Banking'].map(mode => (
                <div
                  key={mode}
                  className={`payment-option ${paymentMode === mode ? 'active' : ''}`}
                  onClick={() => setPaymentMode(mode)}
                >
                  {mode === 'UPI' && <Smartphone size={18} />}
                  {mode === 'Cash' && <Banknote size={18} />}
                  {mode === 'Card' && <CreditCard size={18} />}
                  {mode === 'Net Banking' && <Wallet size={18} />}
                  <span>{mode}</span>
                </div>
              ))}
            </div>

            <button className="pay-btn" onClick={handlePlaceOrder} disabled={!selectedAddress || !paymentMode}>
              Pay ₹{totalSpend.toLocaleString()} & Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  return (
    <div className="page">
      <h2 className="page-title">Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">🤍</div><p>Your wishlist is empty</p></div>
      ) : (
        <div className="product-grid">
          {wishlist.map(item => (
            <div key={item.id} className="product-card">
              <div className="product-content">
                <h3>{item.name}</h3>
                <p className="current-price">₹{item.price}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                <button className="wishlist-btn" onClick={() => toggleWishlist(item)}>❤️ Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const { user, logout } = useAuth();
  const { orders } = useApp();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="page">
        <p>Please <Link to="/login" style={{ color: '#ff3859', cursor: 'pointer' }}>login</Link> to view your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="page">
      <h2 className="page-title">Profile</h2>
      <div className="profile-page" style={{ background: '#fff', padding: '30px', borderRadius: '20px' }}>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
          <button onClick={() => navigate('/address')} style={{ padding: '10px 20px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Manage Addresses
          </button>
          <button onClick={() => navigate('/orders')} style={{ padding: '10px 20px', background: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Order History ({orders.length})
          </button>
          <button onClick={() => { logout(); navigate('/'); }} style={{ padding: '10px 20px', background: '#ff3859', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressPage() {
  const { addresses, setAddresses } = useApp();
  const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '', city: '', zip: '' });
  
  const addAddress = () => {
    if (newAddress.address) {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
      setNewAddress({ name: '', phone: '', address: '', city: '', zip: '' });
      toast.success('✅ Address added!');
    } else {
      toast.error('Please fill in the address');
    }
  };
  
  const removeAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.info('Address removed');
  };
  
  return (
    <div className="page">
      <h2 className="page-title">Addresses</h2>
      {addresses.map(addr => (
        <div key={addr.id} className="address-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '15px' }}>
          <div>
            <p><strong>{addr.name}</strong> | {addr.phone}</p>
            <p>{addr.address}, {addr.city} - {addr.zip}</p>
          </div>
          <button className="address-btn" onClick={() => removeAddress(addr.id)}><Trash2 size={16} /></button>
        </div>
      ))}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
        <h3>Add New Address</h3>
        <input placeholder="Full Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        <input placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        <input placeholder="Address" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        <input placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        <input placeholder="ZIP" value={newAddress.zip} onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        <button onClick={addAddress} style={{ width: '100%', padding: '10px', background: '#ff3859', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Add Address</button>
      </div>
    </div>
  );
}

// ============================================================
// ORDER HISTORY PAGE
// ============================================================
function OrdersPage() {
  const { orders } = useApp();
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2 className="page-title">Order History</h2>
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p>No orders yet. Start shopping!</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card" onClick={() => navigate(`/track/${order.id}`)}>
            <div className="order-header">
              <span><strong>Order #{order.id}</strong> - {new Date(order.createdAt).toLocaleDateString()}</span>
              <span className={`order-status ${order.status === 'Delivered' ? '' : order.status === 'In-Transit' ? 'shipped' : 'processing'}`}>
                {order.status}
              </span>
            </div>
            <div>Items: {order.items.length}</div>
            <div>Total: ₹{order.total.toLocaleString()}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
              Payment: {order.payment} • Delivery to: {order.address.name}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ============================================================
// TRACK ORDER PAGE WITH MAP – BIKE ICON ADDED
// ============================================================
function TrackOrderPage() {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useApp();
  const order = orders.find(o => o.id === id);
  const navigate = useNavigate();

  const [riderPos, setRiderPos] = useState(order?.rider?.location || { lat: 12.9716, lng: 77.5946 });
  const [status, setStatus] = useState(order?.status || 'Dispatched');

  // Simulate rider movement and status updates
  useEffect(() => {
    if (!order) return;

    const statusInterval = setInterval(() => {
      if (status === 'Dispatched') {
        setStatus('In-Transit');
        updateOrderStatus(order.id, 'In-Transit');
        toast.info('📦 Your order is now In-Transit');
      } else if (status === 'In-Transit') {
        setStatus('Delivered');
        updateOrderStatus(order.id, 'Delivered');
        toast.success('✅ Order Delivered!');
        clearInterval(statusInterval);
      }
    }, 10000);

    const moveInterval = setInterval(() => {
      setRiderPos(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 2000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(moveInterval);
    };
  }, [order, status, updateOrderStatus]);

  if (!order) {
    return (
      <div className="page">
        <h2 className="page-title">Order Not Found</h2>
        <p>We couldn't find an order with ID {id}.</p>
        <button onClick={() => navigate('/orders')} className="cart-checkout-btn" style={{ marginTop: '20px', width: 'auto' }}>View All Orders</button>
      </div>
    );
  }

  const statusSteps = ['Dispatched', 'In-Transit', 'Delivered'];
  const currentStep = statusSteps.indexOf(status);

  return (
    <div className="page">
      <h2 className="page-title">Track Order #{order.id}</h2>

      {/* Order Summary */}
      <div className="cart-total" style={{ marginBottom: '20px' }}>
        <div className="cart-total-row"><strong>Total</strong><span>₹{order.total.toLocaleString()}</span></div>
        <div className="cart-total-row"><strong>Payment</strong><span>{order.payment}</span></div>
        <div className="cart-total-row"><strong>Delivery Address</strong><span>{order.address.address}, {order.address.city}</span></div>
        <div className="cart-total-row"><strong>Status</strong><span className={`order-status ${status === 'Delivered' ? '' : status === 'In-Transit' ? 'shipped' : 'processing'}`}>{status}</span></div>
        <div className="cart-total-row"><strong>Rider</strong><span>{order.rider?.name} ({order.rider?.phone})</span></div>
      </div>

      {/* Status Timeline */}
      <div className="order-timeline">
        {statusSteps.map((step, idx) => {
          const isCompleted = idx <= currentStep;
          const isActive = idx === currentStep;
          return (
            <div key={step} className="timeline-step">
              <div className={`timeline-icon ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                {idx === 0 && <Package size={18} />}
                {idx === 1 && <Truck size={18} />}
                {idx === 2 && <CheckCircle size={18} />}
              </div>
              <div className="timeline-content">
                <div className="timeline-title">{step}</div>
                <div className="timeline-desc">
                  {isCompleted ? '✓ Completed' : isActive ? '⏳ In progress' : '⏱️ Pending'}
                  {isActive && <span style={{ marginLeft: '8px', color: '#ff3859' }}>• updating...</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map with Rider Location – using bike icon */}
      <div style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden', marginTop: '20px' }}>
        <MapContainer
          center={[riderPos.lat, riderPos.lng]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[riderPos.lat, riderPos.lng]} icon={bikeIcon}>
            <Popup>
              <div>
                <strong>{order.rider?.name}</strong><br />
                📞 {order.rider?.phone}<br />
                🛵 Currently here
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <button onClick={() => navigate('/orders')} className="cart-checkout-btn" style={{ marginTop: '20px', width: 'auto' }}>Back to Orders</button>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h2>BharatMart</h2>
      <p>Smart shopping, better prices, every time. 🚀</p>
      <div className="footer-platforms">
        <span>🛍️ Amazon</span>
        <span>🛒 Flipkart</span>
        <span>⚡ Zepto</span>
        <span>🚚 Blinkit</span>
      </div>
    </div>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useApp();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="bottom-nav">
      <div className="bottom-item" onClick={() => navigate('/')} style={{ color: isActive('/') ? '#ff3859' : '#6b7280' }}>
        <HomeIcon size={20} />
        <span>Home</span>
      </div>
      <div className="bottom-item" onClick={() => navigate('/wishlist')} style={{ color: isActive('/wishlist') ? '#ff3859' : '#6b7280' }}>
        <Heart size={20} />
        <span>Wishlist</span>
      </div>
      <div className="bottom-item" onClick={() => navigate('/orders')} style={{ color: isActive('/orders') ? '#ff3859' : '#6b7280' }}>
        <Package size={20} />
        <span>Orders</span>
      </div>
      <div className="bottom-item" onClick={() => navigate('/cart')} style={{ color: isActive('/cart') ? '#ff3859' : '#6b7280', position: 'relative' }}>
        <ShoppingCart size={20} />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        <span>Cart</span>
      </div>
      <div className="bottom-item" onClick={() => navigate('/profile')} style={{ color: isActive('/profile') ? '#ff3859' : '#6b7280' }}>
        <User size={20} />
        <span>Profile</span>
      </div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/track/:id" element={<TrackOrderPage />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}
