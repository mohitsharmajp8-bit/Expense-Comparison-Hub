import { DollarSign, Package, Users, ShoppingBag } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SellerDashboard() {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [120000, 185000, 210000, 176000, 240000, 310000],
      backgroundColor: 'rgba(255, 56, 89, 0.7)',
      borderRadius: 8
    }]
  };

  const categoryData = {
    labels: ['Mobiles', 'Fashion', 'Electronics', 'Grocery', 'Beauty'],
    datasets: [{
      data: [35, 20, 25, 12, 8],
      backgroundColor: ['#ff3859', '#ff9800', '#8b5cf6', '#16a34a', '#0ea5e9']
    }]
  };

  return (
    <div>
      <div className="seller-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue', value: '₹10.4L', icon: <DollarSign size={20} color="#ff3859" /> },
          { label: 'Total Orders', value: '1,284', icon: <Package size={20} color="#8b5cf6" /> },
          { label: 'Customers', value: '892', icon: <Users size={20} color="#16a34a" /> },
          { label: 'Products', value: '48', icon: <ShoppingBag size={20} color="#0ea5e9" /> },
        ].map(m => (
          <div key={m.label} className="seller-metric">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>{m.icon}</div>
            <div className="seller-metric-value">{m.value}</div>
            <div className="seller-metric-label">{m.label}</div>
          </div>
        ))}
      </div>
      
      <div className="seller-charts-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 800, marginBottom: 16, marginTop: 0 }}>📈 Monthly Revenue</h3>
          <Bar 
            data={revenueData} 
            options={{ 
              responsive: true, 
              plugins: { legend: { display: false } }, 
              scales: { y: { beginAtZero: true } } 
            }} 
          />
        </div>
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 800, marginBottom: 16, marginTop: 0 }}>🍩 Category Mix</h3>
          <Doughnut 
            data={categoryData} 
            options={{ 
              responsive: true, 
              plugins: { legend: { position: 'bottom' } } 
            }} 
          />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 24, marginTop: 24 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 16, marginTop: 0 }}>📦 Inventory</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'iPhone 15 Pro Max', stock: 14, status: 'Low Stock' },
            { name: 'Sony WH-1000XM5', stock: 58, status: 'In Stock' },
            { name: 'Nike Air Max 270', stock: 0, status: 'Out of Stock' },
            { name: 'Amul Butter', stock: 200, status: 'In Stock' },
          ].map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.4)' }}>
              <span style={{ fontWeight: 700 }}>{item.name}</span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>{item.stock} units</span>
                <span style={{ 
                  fontSize: 12, 
                  padding: '4px 10px', 
                  borderRadius: 999, 
                  fontWeight: 700, 
                  background: item.stock === 0 ? 'rgba(239,68,68,0.1)' : item.stock < 20 ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)', 
                  color: item.stock === 0 ? '#ef4444' : item.stock < 20 ? '#f59e0b' : '#16a34a', 
                  border: `1px solid ${item.stock === 0 ? 'rgba(239,68,68,0.2)' : item.stock < 20 ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.2)'}` 
                }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
