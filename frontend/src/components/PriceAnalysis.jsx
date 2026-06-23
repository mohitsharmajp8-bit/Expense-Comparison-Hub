import { useState } from 'react';
import { BarChart3, TrendingDown } from 'lucide-react';

export default function PriceAnalysis({ product }) {
  const [range, setRange] = useState("max");
  
  if (!product || !product.priceHistory) return null;

  const getPrices = () => {
    if (range === "1m") return product.priceHistory.slice(-4);
    if (range === "3m") return product.priceHistory.slice(-8);
    return product.priceHistory;
  };
  
  const disp = getPrices();
  const maxP = Math.max(...disp.map(p => p.price));
  const minP = Math.min(...disp.map(p => p.price));
  const height = (price) => ((price - minP) / ((maxP - minP) || 1)) * 80 + 20;

  return (
    <div className="price-analysis-card">
      <div className="price-analysis-header">
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
          <BarChart3 size={14} color="#ff3859" /> Should you buy now?
        </h4>
        <div style={{ display: 'flex', gap: 4 }}>
          {["1m", "3m", "max"].map(r => (
            <button
              key={r}
              className={`time-btn ${range === r ? "active" : ""}`}
              onClick={() => setRange(r)}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: product.isGoodTime ? '#16a34a' : '#ff3859' }}>
          {product.buyRecommendation}
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
          {product.recommendationSub}
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Highest</div>
          <div className="stat-value">₹{product.highestPrice.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average</div>
          <div className="stat-value">₹{product.avgPrice.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lowest</div>
          <div className="stat-value">₹{product.lowestPrice.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current</div>
          <div className="stat-value" style={{ color: product.isGoodTime ? "#16a34a" : "#ff3859" }}>
            ₹{product.price.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="price-chart">
        <div className="chart-title">
          <span>Price History</span>
          <span style={{ fontSize: 10, color: '#888' }}>Hover on bars</span>
        </div>
        <div className="chart-container">
          {disp.map((item, idx) => (
            <div key={idx} className="chart-bar" style={{ height: `${height(item.price)}%` }}>
              <span className="chart-bar-tooltip">₹{item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 9, color: '#888' }}>
          {disp.map((item, idx) => <span key={idx}>{item.date}</span>)}
        </div>
      </div>
    </div>
  );
}
