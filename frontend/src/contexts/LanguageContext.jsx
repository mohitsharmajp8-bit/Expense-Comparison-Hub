import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    appName: 'BharatMart', search: 'Search products...', categories: 'Categories',
    trending: 'Trending Deals', compare: 'Compare Prices', addToCart: 'Add To Cart',
    wishlist: 'Wishlist', cart: 'Cart', profile: 'Profile', login: 'Login',
    signup: 'Sign Up', logout: 'Logout', orders: 'Orders', address: 'Address',
    payment: 'Payment', emi: 'EMI', cod: 'Cash on Delivery', return: 'Return',
    refund: 'Refund', openBox: 'Open Box Delivery', sellerDashboard: 'Seller Dashboard',
    inventory: 'Inventory', revenue: 'Revenue', orderTracking: 'Order Tracking',
    aiChat: 'AI Shopping Assistant'
  },
  hi: {
    appName: 'भारतमार्ट', search: 'उत्पाद खोजें...', categories: 'श्रेणियाँ',
    trending: 'ट्रेंडिंग ऑफर', compare: 'कीमत तुलना', addToCart: 'कार्ट में डालें',
    wishlist: 'विशलिस्ट', cart: 'कार्ट', profile: 'प्रोफ़ाइल', login: 'लॉगिन',
    signup: 'साइन अप', logout: 'लॉगआउट', orders: 'ऑर्डर', address: 'पता',
    payment: 'भुगतान', emi: 'ईएमआई', cod: 'कैश ऑन डिलीवरी', return: 'वापसी',
    refund: 'धनवापसी', openBox: 'ओपन बॉक्स डिलीवरी', sellerDashboard: 'विक्रेता डैशबोर्ड',
    inventory: 'इन्वेंटरी', revenue: 'राजस्व', orderTracking: 'ऑर्डर ट्रैकिंग',
    aiChat: 'एआई शॉपिंग असिस्टेंट'
  },
  kn: {
    appName: 'ಭಾರತ್ಮಾರ್ಟ್', search: 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...', categories: 'ವರ್ಗಗಳು',
    trending: 'ಟ್ರೆಂಡಿಂಗ್ ಡೀಲ್ಗಳು', compare: 'ಬೆಲೆ ಹೋಲಿಕೆ', addToCart: 'ಕಾರ್ಟ್ಗೆ ಸೇರಿಸಿ',
    wishlist: 'ವಿಶ್ಲಿಸ್ಟ್', cart: 'ಕಾರ್ಟ್', profile: 'ಪ್ರೊಫೈಲ್', login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್', logout: 'ಲಾಗೌಟ್', orders: 'ಆರ್ಡರ್ಗಳು', address: 'ವಿಳಾಸ',
    payment: 'ಪಾವತಿ', emi: 'ಇಎಂಐ', cod: 'ಡೆಲಿವರಿಯಲ್ಲಿ ನಗದು', return: 'ಹಿಂದಿರುಗಿಸು',
    refund: 'ಹಣ ಮರುಪಡೆ', openBox: 'ಓಪನ್ ಬಾಕ್ಸ್ ಡೆಲಿವರಿ', sellerDashboard: 'ಮಾರಾಟಗಾರ ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    inventory: 'ಇನ್ವೆಂಟರಿ', revenue: 'ಆದಾಯ', orderTracking: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    aiChat: 'ಎಐ ಶಾಪಿಂಗ್ ಸಹಾಯಕ'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bm_lang') || 'en');
  useEffect(() => localStorage.setItem('bm_lang', lang), [lang]);
  const t = (key) => translations[lang]?.[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
