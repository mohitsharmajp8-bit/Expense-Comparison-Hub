import { createContext, useContext, useState, useEffect } from 'react';
import { NOTIFICATIONS } from '../data/notifications';
import { productImageMap } from '../data/products';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const readStorage = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const writeStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const raw = readStorage('bm_cart', []);
    return raw.map(item => {
      if (item.image && item.image.includes('pinimg.com')) {
        const baseName = item.name.split(' (V')[0];
        const baseNameClean = baseName.split(' (')[0];
        const correctImg = productImageMap[baseNameClean] || productImageMap[baseName] || item.image;
        return { ...item, image: correctImg };
      }
      return item;
    });
  });

  const [wishlist, setWishlist] = useState(() => {
    const raw = readStorage('bm_wishlist', []);
    return raw.map(item => {
      if (item.image && item.image.includes('pinimg.com')) {
        const baseName = item.name.split(' (V')[0];
        const baseNameClean = baseName.split(' (')[0];
        const correctImg = productImageMap[baseNameClean] || productImageMap[baseName] || item.image;
        return { ...item, image: correctImg };
      }
      return item;
    });
  });

  const [darkMode, setDarkMode] = useState(() => readStorage('bm_dark', false));
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(() => readStorage('bm_notifications', NOTIFICATIONS));

  useEffect(() => { writeStorage('bm_cart', cart); }, [cart]);
  useEffect(() => { writeStorage('bm_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { writeStorage('bm_notifications', notifications); }, [notifications]);
  useEffect(() => {
    writeStorage('bm_dark', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  // Migrate offline orders on startup if they contain broken pinimg URLs
  useEffect(() => {
    try {
      const rawOrders = localStorage.getItem('bm_offline_orders');
      if (rawOrders) {
        const orders = JSON.parse(rawOrders);
        let changed = false;
        const updated = orders.map(order => {
          let items = order.items;
          let itemsChanged = false;
          if (Array.isArray(items)) {
            items = items.map(item => {
              if (item.image && item.image.includes('pinimg.com')) {
                const baseName = item.name.split(' (V')[0];
                const baseNameClean = baseName.split(' (')[0];
                const correctImg = productImageMap[baseNameClean] || productImageMap[baseName] || item.image;
                itemsChanged = true;
                return { ...item, image: correctImg };
              }
              return item;
            });
          }
          if (itemsChanged) {
            changed = true;
            return { ...order, items, image: items[0]?.image || order.image };
          }
          return order;
        });
        if (changed) {
          localStorage.setItem('bm_offline_orders', JSON.stringify(updated));
        }
      }
    } catch (e) {
      console.error('Offline orders migration error:', e);
    }
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setCart([]);
  const toggleWishlist = (product) => {
    setWishlist(prev => prev.some(w => w.id === product.id) ? prev.filter(w => w.id !== product.id) : [...prev, product]);
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, time: 'Just now', unread: true },
      ...prev
    ]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, wishlist, toggleWishlist, darkMode, setDarkMode, search, setSearch, selectedCategory, setSelectedCategory, showNotif, setShowNotif, notifications, addNotification, markAllNotificationsAsRead }}>
      {children}
    </AppContext.Provider>
  );
}

