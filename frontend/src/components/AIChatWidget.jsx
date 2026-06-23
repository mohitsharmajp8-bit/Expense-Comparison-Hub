import { useState, useEffect, useRef } from 'react';
import { Bot, X, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import API from '../services/api';

const AI_RESPONSES = {
  default: "Hi! I'm your AI shopping assistant 🤖 I can help you find the best deals, compare prices, and recommend products. What are you looking for today?",
  phone: "📱 For phones, I recommend checking the **Mobiles** category. The **iPhone 15 Pro Max** and **Samsung S24 Ultra** are top-rated. Both are available at great prices on Amazon and Flipkart right now!",
  price: "💰 To get the best price, use the **Compare Prices** feature on any product card. It shows live prices across Amazon, Flipkart, Zepto, Blinkit, BigBasket & Instamart.",
  grocery: "🛒 For groceries, Blinkit and Zepto offer **10-minute delivery**! BigBasket has great deals on bulk orders. Check out our Grocery and Vegetables sections.",
  discount: "🏷️ Currently, Electronics have up to **20% OFF** and Mobiles have some amazing deals. The best time to buy is now — prices are at a yearly low for several products!",
  deliver: "🚀 Delivery times vary by platform: Zepto/Blinkit offer 10-min delivery, Instamart 30 mins, BigBasket 2 hrs, Amazon/Flipkart 1-2 days.",
  return: "↩️ Most products have a **7-30 day return policy**. Electronics generally get 7 days, Fashion gets 30 days. Open Box Delivery is available for expensive electronics!",
  emi: "💳 EMI options are available for orders above ₹3,000. You can choose 3, 6, 9, or 12 month plans during checkout. No-cost EMI is available on select products!",
};

function getLocalAIResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('phone') || m.includes('mobile') || m.includes('iphone') || m.includes('samsung')) return AI_RESPONSES.phone;
  if (m.includes('price') || m.includes('cheap') || m.includes('best deal') || m.includes('compare')) return AI_RESPONSES.price;
  if (m.includes('grocery') || m.includes('vegetable') || m.includes('food')) return AI_RESPONSES.grocery;
  if (m.includes('discount') || m.includes('offer') || m.includes('sale')) return AI_RESPONSES.discount;
  if (m.includes('deliver') || m.includes('fast') || m.includes('quick')) return AI_RESPONSES.deliver;
  if (m.includes('return') || m.includes('refund') || m.includes('exchange')) return AI_RESPONSES.return;
  if (m.includes('emi') || m.includes('instalment') || m.includes('payment')) return AI_RESPONSES.emi;
  return AI_RESPONSES.default;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: AI_RESPONSES.default }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    try {
      // Try to get response from backend
      const { data } = await API.post('/ai-chat', { message: userMsg });
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      console.warn('Backend AI chat unavailable, using offline rule-based fallback', err);
      // Fallback response
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: getLocalAIResponse(userMsg) }]);
      }, 500);
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="ai-chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 50, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
                <div>
                  <div style={{ fontWeight: 800 }}>BharatMart AI</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Always here to help</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="ai-chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-chat-msg ${m.from}`}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ))}
              {typing && (
                <div className="ai-chat-msg bot" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s infinite' }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s 0.2s infinite' }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', animation: 'pulse 1s 0.4s infinite' }}></div>
                </div>
              )}
            </div>
            <div className="ai-chat-footer">
              <input
                className="ai-chat-input"
                placeholder="Ask about products, prices..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button className="ai-send-btn" onClick={send}><Navigation size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="ai-chat-fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={24} color="white" /> : <Bot size={24} color="white" />}
      </motion.button>
    </>
  );
}
