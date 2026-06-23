export default function Footer() {
  return (
    <footer className="footer">
      <h2>BharatMart</h2>
      <p>India's smartest price comparison engine.<br />Compare across 6+ platforms and save big every day.</p>
      <div className="footer-links">
        {['About Us', 'Sell With Us', 'Careers', 'Press', 'Privacy Policy', 'Terms', 'Help Center', 'Contact'].map(l => (
          <span key={l} className="footer-link">{l}</span>
        ))}
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', color: '#475569', fontSize: 13 }}>
        © 2026 BharatMart Technologies Pvt. Ltd. All rights reserved.<br />Made with ❤️ in Bengaluru, India
      </div>
    </footer>
  );
}
