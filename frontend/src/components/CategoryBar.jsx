import { useApp } from '../contexts/AppContext';
import { categoriesList } from '../data/products';
import { category3DIconMap } from './CategoryIcons3D';

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useApp();

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
              <div className="category-nav-icon-container">
                {category3DIconMap[cat] || category3DIconMap['For You']}
              </div>
              <div className="category-nav-label">{cat}</div>
              {isActive && <div className="category-active-indicator" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
