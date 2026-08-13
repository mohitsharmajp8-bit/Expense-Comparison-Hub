import { useApp } from '../contexts/AppContext';
import { categoriesList } from '../data/products';

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useApp();

  const categoryIcons = {
    'For You': '🛍️',
    'Fashion': '👕',
    'Mobiles': '📱',
    'Electronics': '💻',
    'Beauty': '💄',
    'Home': '🛋️',
    'Appliances': '📺',
    'Toys, Baby & More': '🧸',
    'Food & Health': '🥣',
    'Auto Accessories': '🏍️',
    'Sports & Fitness': '🏏',
    'Furniture': '🪑',
    'Books & Stationery': '📚',
    '2 Wheelers': '🛵',
    'Vegetables': '🥦'
  };

  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-container">
        {categoriesList.map(cat => {
          const isActive = (selectedCategory === cat) || (cat === 'For You' && selectedCategory === 'All');
          return (
            <div
              key={cat}
              className={`category-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat === 'For You' ? 'All' : cat)}
            >
              <div className="category-nav-icon">{categoryIcons[cat] || '🛒'}</div>
              <div className="category-nav-label">{cat}</div>
              {isActive && <div className="category-active-indicator" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
