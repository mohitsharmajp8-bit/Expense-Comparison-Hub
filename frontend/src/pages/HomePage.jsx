import CategoryBar from '../components/CategoryBar';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import products from '../data/products';

export default function HomePage() {
  const { selectedCategory, search } = useApp();
  const { t } = useLanguage();

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || selectedCategory === 'For You' || p.category === selectedCategory;
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <CategoryBar />
      <BannerCarousel />

      <div className="products">
        <div className="section-header">
          <h2 className="section-title">
            {search ? `Results for "${search}"` : (selectedCategory === 'All' || selectedCategory === 'For You') ? 'Top Deals & Trending Products 🔥' : selectedCategory}
          </h2>
          <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{filtered.length} products available</span>
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
