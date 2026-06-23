import { TrendingDown } from 'lucide-react';
import { PLATFORMS } from '../data/platforms';

export default function PlatformCompare({ product }) {
  if (!product || !product.compare) return null;

  const entries = Object.entries(product.compare).sort((a, b) => a[1] - b[1]);
  const bestPrice = entries[0]?.[1];

  return (
    <div className="platform-compare-card">
      <div className="platform-compare-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingDown size={14} color="#ff3859" /> Compare Prices
        </span>
        <span className="best-label">Best Deal ↑</span>
      </div>
      <div className="platform-rows">
        {entries.map(([platform, price]) => {
          const cfg = PLATFORMS[platform] || { bg: '#ccc', text: '#333', short: platform.slice(0, 2), delivery: 'N/A' };
          return (
            <div key={platform} className={`platform-row ${price === bestPrice ? "best-price" : ""}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: cfg.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 800,
                  color: cfg.text
                }}>
                  {cfg.short}
                </div>
                <div>
                  <div className="platform-label">{platform}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{cfg.delivery}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="platform-price" style={{ color: price === bestPrice ? '#ff3859' : 'inherit' }}>
                  ₹{price.toLocaleString()}
                </div>
                {price === bestPrice && <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700 }}>Lowest 🎯</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
