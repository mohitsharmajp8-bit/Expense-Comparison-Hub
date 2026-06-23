import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS import
import './styles/global.css';

// Context Providers
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';

// Component imports
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import NotificationsPanel from './components/NotificationsPanel';
import BottomNav from './components/BottomNav';
import AIChatWidget from './components/AIChatWidget';
import ErrorBoundary from './components/ErrorBoundary';

// Page imports
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import TrackingPage from './pages/TrackingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <LanguageProvider>
          <AuthProvider>
            <AppProvider>
              <ToastContainer 
                position="top-right" 
                autoClose={2500} 
                theme="colored" 
                toastStyle={{ borderRadius: 16, fontWeight: 600 }} 
              />
              <ScrollToTop />
              <Header />
              <NotificationsPanel />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/track" element={<TrackingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<div className="page"><LoginPage /></div>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <BottomNav />
              <AIChatWidget />
            </AppProvider>
          </AuthProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </Router>
  );
}
