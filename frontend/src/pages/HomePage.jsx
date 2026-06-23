import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import products, { categoriesList } from '../data/products';

export default function HomePage() {
  const { selectedCategory, setSelectedCategory, search } = useApp();
  const { t } = useLanguage();
  
  const categoryIcons = { 
    All: "🛒", 
    Mobiles: "📱", 
    Fashion: "👗", 
    Electronics: "🎧", 
    Grocery: "🛒", 
    Beauty: "💄", 
    "Home & Kitchen": "🏠", 
    Vegetables: "🥦" 
  };

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Hero />
      <div className="categories">
        <div className="section-header">
          <h2 className="section-title">{t('categories')}</h2>
        </div>
        <div className="category-grid">
          {categoriesList.map(cat => (
            <div 
              key={cat} 
              className={`category-card ${selectedCategory === cat ? "active" : ""}`} 
              onClick={() => setSelectedCategory(cat)}
            >
              <div className="category-icon">{categoryIcons[cat] || "🛒"}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{cat}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="products">
        <div className="section-header">
          <h2 className="section-title">
            {search ? `Results for "${search}"` : selectedCategory === "All" ? t('trending') : selectedCategory}
          </h2>
          <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{filtered.length} products</span>
        </div>
        
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, opacity: 0.5 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>No products found</div>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
