// High-Quality 3D Isometric & Glossy Category Icons matching reference UI screenshot

export function IconForYou() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #eef6ff, #dbeafe)', border: '1px solid rgba(191, 219, 254, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bagGrad" x1="12" y1="14" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <filter id="shadowBag" x="8" y="10" width="32" height="34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#1e40af" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Handle */}
        <path d="M18 16C18 12.6863 20.6863 10 24 10C27.3137 10 30 12.6863 30 16" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Main Bag Body */}
        <rect x="12" y="16" width="24" height="24" rx="6" fill="url(#bagGrad)" filter="url(#shadowBag)" />
        <rect x="12" y="16" width="24" height="24" rx="6" stroke="#93c5fd" strokeWidth="1" />

        {/* Heart Detail */}
        <path d="M24 29C24 29 20 26 20 23.5C20 22.1193 21.1193 21 22.5 21C23.3644 21 24 21.5 24 21.5C24 21.5 24.6356 21 25.5 21C26.8807 21 28 22.1193 28 23.5C28 26 24 29 24 29Z" fill="white" />
      </svg>
    </div>
  );
}

export function IconFashion() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: '1px solid rgba(24bcfe, 231, 243, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="dressGrad" x1="14" y1="16" x2="34" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f472b6" />
            <stop offset="1" stopColor="#db2777" />
          </linearGradient>
        </defs>
        {/* Hanger */}
        <path d="M24 10C22.5 10 22 11.5 23 13L16 18H32L25 13C26 11.5 25.5 10 24 10Z" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Dress */}
        <path d="M18 18L15 28L12 40C12 40 24 43 36 40L33 28L30 18H18Z" fill="url(#dressGrad)" />
        {/* Waist Ribbon */}
        <rect x="17" y="24" width="14" height="3" rx="1.5" fill="#fbcfe8" />
      </svg>
    </div>
  );
}

export function IconMobiles() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: '1px solid rgba(186, 230, 253, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="screenGrad" x1="16" y1="10" x2="32" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        {/* Phone Body */}
        <rect x="15" y="8" width="18" height="32" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        {/* Screen */}
        <rect x="16.5" y="10" width="15" height="28" rx="2.5" fill="url(#screenGrad)" />
        {/* Notch */}
        <rect x="21" y="9" width="6" height="1.5" rx="0.75" fill="#0f172a" />
      </svg>
    </div>
  );
}

export function IconElectronics() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid rgba(221, 214, 254, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="lapScreen" x1="12" y1="12" x2="36" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        {/* Screen Lid */}
        <rect x="12" y="12" width="24" height="17" rx="2" fill="url(#lapScreen)" stroke="#475569" strokeWidth="1.5" />
        <rect x="14" y="14" width="20" height="13" fill="#38bdf8" opacity="0.8" />
        {/* Base */}
        <path d="M8 31C8 29.8954 8.89543 29 10 29H38C39.1046 29 40 29.8954 40 31V33C40 34.1046 39.1046 35 38 35H10C8.89543 35 8 34.1046 8 33V31Z" fill="#94a3b8" />
        <rect x="20" y="29.5" width="8" height="1" rx="0.5" fill="#64748b" />
      </svg>
    </div>
  );
}

export function IconBeauty() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', border: '1px solid rgba(254, 205, 211, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="lipGrad" x1="20" y1="10" x2="28" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb7185" />
            <stop offset="1" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        {/* Lipstick Bullet */}
        <path d="M20 18L24 10L28 18V24H20V18Z" fill="url(#lipGrad)" />
        {/* Gold Holder */}
        <rect x="19" y="24" width="10" height="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        {/* Base Tube */}
        <rect x="18" y="30" width="12" height="10" rx="2" fill="#1e293b" />
      </svg>
    </div>
  );
}

export function IconHome() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid rgba(187, 247, 208, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="chairGrad" x1="12" y1="20" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        {/* Armchair */}
        <rect x="14" y="20" width="20" height="14" rx="4" fill="url(#chairGrad)" />
        <rect x="10" y="26" width="6" height="10" rx="3" fill="#0369a1" />
        <rect x="32" y="26" width="6" height="10" rx="3" fill="#0369a1" />
        <rect x="13" y="32" width="22" height="6" rx="2" fill="#0284c7" />
        {/* Legs */}
        <path d="M15 38L13 42M33 38L35 42" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function IconAppliances() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: '1px solid rgba(186, 230, 253, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="washGrad" x1="14" y1="10" x2="34" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8fafc" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        {/* Body */}
        <rect x="13" y="10" width="22" height="30" rx="4" fill="url(#washGrad)" stroke="#64748b" strokeWidth="1.5" />
        {/* Drawer & Dial */}
        <rect x="16" y="13" width="8" height="3" rx="1" fill="#94a3b8" />
        <circle cx="30" cy="14.5" r="2" fill="#3b82f6" />
        {/* Glass Door */}
        <circle cx="24" cy="27" r="8" fill="#38bdf8" stroke="#475569" strokeWidth="2" opacity="0.9" />
        <circle cx="24" cy="27" r="5" fill="#0284c7" opacity="0.6" />
      </svg>
    </div>
  );
}

export function IconToys() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', border: '1px solid rgba(254, 215, 170, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="bearGrad" x1="14" y1="12" x2="34" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb923c" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        {/* Ears */}
        <circle cx="17" cy="15" r="4" fill="#c2410c" />
        <circle cx="31" cy="15" r="4" fill="#c2410c" />
        {/* Head */}
        <circle cx="24" cy="20" r="9" fill="url(#bearGrad)" />
        {/* Snout */}
        <ellipse cx="24" cy="22" rx="4" ry="3" fill="#ffedd5" />
        <ellipse cx="24" cy="21" rx="1.5" ry="1" fill="#431407" />
        {/* Body */}
        <circle cx="24" cy="32" r="10" fill="url(#bearGrad)" />
        {/* Bowtie */}
        <path d="M21 26L24 27.5L27 26L27 29L24 27.5L21 29Z" fill="#2563eb" />
      </svg>
    </div>
  );
}

export function IconFoodHealth() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #ecfdf5, #dcfce7)', border: '1px solid rgba(187, 247, 208, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="bowlGrad" x1="12" y1="24" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        {/* Greens inside */}
        <circle cx="20" cy="22" r="6" fill="#4ade80" />
        <circle cx="28" cy="21" r="5.5" fill="#22c55e" />
        <circle cx="24" cy="19" r="6" fill="#16a34a" />
        <circle cx="22" cy="18" r="2" fill="#ef4444" />
        {/* Bowl */}
        <path d="M12 24C12 24 14 36 24 36C34 36 36 24 36 24H12Z" fill="url(#bowlGrad)" />
        {/* Spoon */}
        <path d="M30 12L25 24" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function IconAutoAccessories() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', border: '1px solid rgba(203, 213, 225, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        {/* Tire Outer */}
        <circle cx="24" cy="24" r="16" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        {/* Rim Inner */}
        <circle cx="24" cy="24" r="10" fill="#94a3b8" />
        <circle cx="24" cy="24" r="5" fill="#475569" />
        {/* Red Caliper */}
        <path d="M17 17C15 19 14 22 14 24" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        {/* Spokes */}
        <path d="M24 14V19M24 29V34M14 24H19M29 24H34M17 17L20.5 20.5M27.5 27.5L31 31M31 17L27.5 20.5M20.5 27.5L17 31" stroke="#cbd5e1" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function IconSportsFitness() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', border: '1px solid rgba(233, 213, 255, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="dumbGrad" x1="12" y1="16" x2="36" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#475569" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        {/* Dumbbell */}
        <rect x="14" y="22" width="20" height="4" rx="2" fill="#94a3b8" />
        <rect x="12" y="16" width="5" height="16" rx="2" fill="url(#dumbGrad)" />
        <rect x="31" y="16" width="5" height="16" rx="2" fill="url(#dumbGrad)" />
        <rect x="9" y="19" width="3" height="10" rx="1" fill="#334155" />
        <rect x="36" y="19" width="3" height="10" rx="1" fill="#334155" />
      </svg>
    </div>
  );
}

export function IconFurniture() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid rgba(253, 230, 138, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="chairWood" x1="16" y1="16" x2="32" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b45309" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>
        </defs>
        {/* Cushion */}
        <rect x="16" y="24" width="16" height="8" rx="3" fill="#d97706" />
        {/* Backrest */}
        <rect x="18" y="14" width="12" height="11" rx="2" fill="url(#chairWood)" />
        {/* Wooden Legs */}
        <path d="M18 32L16 41M30 32L32 41M20 32L21 41M28 32L27 41" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function IconBooksStationery() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', border: '1px solid rgba(186, 230, 253, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        {/* Stacked Books */}
        <rect x="12" y="30" width="24" height="6" rx="2" fill="#ef4444" />
        <rect x="14" y="24" width="22" height="6" rx="2" fill="#3b82f6" />
        <rect x="16" y="18" width="20" height="6" rx="2" fill="#10b981" />
        {/* Pages details */}
        <rect x="33" y="31.5" width="2" height="3" fill="white" />
        <rect x="33" y="25.5" width="2" height="3" fill="white" />
        <rect x="33" y="19.5" width="2" height="3" fill="white" />
      </svg>
    </div>
  );
}

export function IconTwoWheelers() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid rgba(191, 219, 254, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="scootGrad" x1="14" y1="16" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        {/* Wheels */}
        <circle cx="16" cy="34" r="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="34" cy="34" r="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
        {/* Body Frame */}
        <path d="M16 34H26L29 24H36L34 16H28" stroke="url(#scootGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Seat */}
        <rect x="15" y="22" width="10" height="4" rx="2" fill="#0f172a" />
        {/* Headlight */}
        <circle cx="34" cy="16" r="2.5" fill="#fbbf24" />
      </svg>
    </div>
  );
}

export function IconVegetables() {
  return (
    <div className="icon-3d-box" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', border: '1px solid rgba(187, 247, 208, 0.6)' }}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        {/* Basket */}
        <path d="M12 24L15 36H33L36 24H12Z" fill="#b45309" />
        <path d="M12 24H36" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        {/* Veggies */}
        <circle cx="20" cy="20" r="5" fill="#ef4444" /> {/* Tomato */}
        <ellipse cx="28" cy="19" rx="4" ry="6" fill="#f97316" transform="rotate(20 28 19)" /> {/* Carrot */}
        <circle cx="24" cy="17" r="4.5" fill="#22c55e" /> {/* Broccoli */}
      </svg>
    </div>
  );
}

export const category3DIconMap = {
  'For You': <IconForYou />,
  'Fashion': <IconFashion />,
  'Mobiles': <IconMobiles />,
  'Electronics': <IconElectronics />,
  'Beauty': <IconBeauty />,
  'Home': <IconHome />,
  'Appliances': <IconAppliances />,
  'Toys, Baby & More': <IconToys />,
  'Food & Health': <IconFoodHealth />,
  'Auto Accessories': <IconAutoAccessories />,
  'Sports & Fitness': <IconSportsFitness />,
  'Furniture': <IconFurniture />,
  'Books & Stationery': <IconBooksStationery />,
  '2 Wheelers': <IconTwoWheelers />,
  'Vegetables': <IconVegetables />
};
