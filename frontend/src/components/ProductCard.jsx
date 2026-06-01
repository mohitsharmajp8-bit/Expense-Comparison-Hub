import { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext"; // adjust path as needed
import PriceAnalysis from "./PriceAnalysis";   // adjust path
import PlatformCompare from "./PlatformCompare"; // adjust path

function ProductCard({ item }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.find((p) => p.id === item.id);
  const savings = item.oldPrice - item.price;

  // AI advice state
  const [loadingAi, setLoadingAi] = useState(false);

  const getAiAdvice = async () => {
    setLoadingAi(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ai-advice', {
        productName: item.name,
        price: item.price,
        oldPrice: item.oldPrice,
        priceHistory: item.priceHistory,
        platforms: item.compare
      });
      toast.info(response.data.advice, { autoClose: 8000 });
    } catch (err) {
      toast.error('AI advice unavailable');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="product-card">
      {/* Product Icon / Drawing */}
      <div className="product-image-wrap">
        <div
          className="product-image"
          style={{
            background: item.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "90px",
            color: "white",
            height: "240px"
          }}
        >
          {item.icon}
        </div>

        <div className="discount-badge">{item.discount}</div>
        <div className="delivery-badge">⚡ {item.delivery}</div>
      </div>

      {/* Product Content */}
      <div className="product-content">
        <h3 className="product-title">{item.name}</h3>
        <p className="product-desc">{item.desc}</p>

        {/* Rating */}
        <div className="rating">
          <div className="rating-score">
            <Star size={12} fill="#2e7d32" color="#2e7d32" />
            {item.rating}
          </div>
          <span className="review-count">
            ({item.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="price">
          <span className="current-price">₹{item.price.toLocaleString()}</span>
          <span className="old-price">₹{item.oldPrice.toLocaleString()}</span>
          <span className="savings-tag">Save ₹{savings.toLocaleString()}</span>
        </div>

        {/* Offers */}
        <div className="offer-tags">
          {item.offers.map((offer, i) => (
            <span className="offer" key={i}>{offer}</span>
          ))}
        </div>

        {/* Price Analysis */}
        <PriceAnalysis product={item} />

        {/* Platform Comparison */}
        <PlatformCompare compare={item.compare} />

        {/* Buttons Row */}
        <div className="card-buttons">
          <button className="add-btn" onClick={() => addToCart(item)}>
            Add To Cart
          </button>

          <button className="wishlist-btn" onClick={() => toggleWishlist(item)}>
            {isWishlisted ? "❤️" : "🤍"}
          </button>

          {/* AI Advice Button – separate button */}
          <button
            className="wishlist-btn"
            onClick={getAiAdvice}
            style={{ fontSize: '14px', fontWeight: 'bold' }}
            disabled={loadingAi}
          >
            {loadingAi ? '⏳' : '🤖 AI'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;