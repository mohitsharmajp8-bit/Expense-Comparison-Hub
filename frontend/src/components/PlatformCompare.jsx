import { ExternalLink, CheckCircle, Truck, TrendingDown } from 'lucide-react';
import { PLATFORMS } from '../data/platforms';

export default function PlatformCompare({ product }) {
  if (!product || !product.compare) return null;

  // Prepare platforms list sorted from lowest price to highest price
  const compareEntries = Object.entries(product.compare)
    .map(([platform, price]) => {
      const cfg = PLATFORMS[platform] || {
        bg: '#64748b',
        text: '#ffffff',
        short: platform.slice(0, 2),
        delivery: '1-2 days'
      };
      // Determine delivery fee (Free for best price, or standard ₹40)
      const deliveryFee = price === Math.min(...Object.values(product.compare)) ? 0 : (platform === 'Zepto' || platform === 'Blinkit' ? 29 : 40);
      const totalCost = price + deliveryFee;
      const isOutOfStock = price <= 0;
      return {
        platform,
        price,
        deliveryFee,
        totalCost,
        deliveryTime: product.delivery || cfg.delivery || '1-2 days',
        isOutOfStock,
        cfg
      };
    })
    .sort((a, b) => (a.isOutOfStock ? 1 : 0) - (b.isOutOfStock ? 1 : 0) || a.totalCost - b.totalCost);

  const bestDeal = compareEntries.find(e => !e.isOutOfStock);

  return (
    <div className="price-comparison-table-wrapper">
      <div className="comparison-table-header">
        <div className="table-title">
          <TrendingDown size={18} color="#2563eb" />
          <span>Real-Time Multi-Platform Price Comparison</span>
        </div>
        <span className="live-status-pill">● Sorted by Lowest Price</span>
      </div>

      <div className="table-responsive">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>PLATFORM</th>
              <th>PRICE (INCL. TAXES)</th>
              <th>DELIVERY FEE</th>
              <th>EST. DELIVERY</th>
              <th>DEAL STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {compareEntries.map((item) => {
              const isBest = bestDeal && item.platform === bestDeal.platform;
              return (
                <tr key={item.platform} className={isBest ? 'best-deal-row' : ''}>
                  {/* Platform Logo & Name */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="platform-logo-badge" style={{ background: item.cfg.bg, color: item.cfg.text }}>
                        {item.cfg.short}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 13 }}>{item.platform}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>Verified Seller</div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td>
                    {item.isOutOfStock ? (
                      <span className="stock-out-badge">Out of Stock</span>
                    ) : (
                      <div className="table-price-text" style={{ color: isBest ? '#2563eb' : 'inherit' }}>
                        ₹{item.price.toLocaleString()}
                      </div>
                    )}
                  </td>

                  {/* Delivery Charge */}
                  <td>
                    {item.isOutOfStock ? '-' : item.deliveryFee === 0 ? (
                      <span className="free-delivery-badge">FREE Delivery</span>
                    ) : (
                      <span style={{ fontSize: 12, fontWeight: 600 }}>+ ₹{item.deliveryFee}</span>
                    )}
                  </td>

                  {/* Estimated Delivery Time */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                      <Truck size={14} /> {item.deliveryTime}
                    </div>
                  </td>

                  {/* Best Deal Badge */}
                  <td>
                    {isBest ? (
                      <span className="best-price-badge">
                        <CheckCircle size={12} /> BEST PRICE
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Standard</span>
                    )}
                  </td>

                  {/* Direct Link */}
                  <td>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(product.name + ' ' + item.platform)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`table-buy-btn ${isBest ? 'best' : ''}`}
                    >
                      Buy Now <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
