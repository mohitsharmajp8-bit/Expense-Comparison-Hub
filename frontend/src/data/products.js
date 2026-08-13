import { PLATFORMS } from './platforms.js';

const vegetablesList = [
  { en: 'Carrot', hi: 'गाजर', kn: 'ಗಜ್ಜರಿ', price: 40, oldPrice: 50, desc: 'Sweet root vegetable' },
  { en: 'Potato', hi: 'आलू', kn: 'ಆಲೂಗಡ್ಡೆ', price: 30, oldPrice: 40, desc: 'Staple tuber' },
  { en: 'Tomato', hi: 'टमाटर', kn: 'ಟೊಮೆಟೊ', price: 35, oldPrice: 45, desc: 'Juicy fruit vegetable' },
  { en: 'Onion', hi: 'प्याज', kn: 'ಈರುಳ್ಳಿ', price: 25, oldPrice: 35, desc: 'Pungent bulb' },
  { en: 'Cabbage', hi: 'पत्ता गोभी', kn: 'ಎಲೆಕೋಸು', price: 30, oldPrice: 40, desc: 'Leafy green vegetable' },
  { en: 'Cauliflower', hi: 'फूलगोभी', kn: 'ಹೂಕೋಸು', price: 45, oldPrice: 60, desc: 'Flower vegetable' },
  { en: 'Spinach', hi: 'पालक', kn: 'ಪಾಲಕ್', price: 20, oldPrice: 30, desc: 'Leafy green spinach' },
  { en: 'Cucumber', hi: 'खीरा', kn: 'ಸೌತೆಕಾಯಿ', price: 25, oldPrice: 35, desc: 'Cooling cucumber' },
  { en: 'Broccoli', hi: 'हरी फूलगोभी', kn: 'ಹಸಿರು ಹೂಕೋಸು', price: 80, oldPrice: 100, desc: 'Nutrient-dense' },
  { en: 'Lemon', hi: 'नींबू', kn: 'ನಿಂಬೆಹಣ್ಣು', price: 15, oldPrice: 20, desc: 'Tangy fresh lemon' },
  { en: 'Ginger', hi: 'अदरक', kn: 'ಶುಂಠಿ', price: 120, oldPrice: 150, desc: 'Spicy fresh ginger' },
  { en: 'Garlic', hi: 'लहसुन', kn: 'ಬೆಳ್ಳುಳ್ಳಿ', price: 100, oldPrice: 120, desc: 'Pungent garlic bulb' },
  { en: 'Green Chilli', hi: 'हरी मिर्च', kn: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', price: 50, oldPrice: 65, desc: 'Spicy green chillies' },
  { en: 'Coriander', hi: 'हरा धनिया', kn: 'ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪ', price: 15, oldPrice: 25, desc: 'Aromatic coriander' },
  { en: 'Mint', hi: 'पुदीना', kn: 'ಪುದೀನಾ ಸೊಪ್ಪು', price: 15, oldPrice: 25, desc: 'Fresh mint leaves' },
  { en: 'Sweet Potato', hi: 'शकरकंद', kn: 'ಗೆಣಸು', price: 40, oldPrice: 55, desc: 'Sweet starchy tuber' },
  { en: 'Ladies Finger', hi: 'भिंडी', kn: 'ಬೆಂಡೆಕಾಯಿ', price: 35, oldPrice: 45, desc: 'Fresh okra' },
  { en: 'Brinjal', hi: 'बैंगन', kn: 'ಬದನೆಕಾಯಿ', price: 30, oldPrice: 40, desc: 'Fresh eggplants' },
  { en: 'Green Peas', hi: 'हरी मटर', kn: 'ಹಸಿರು ಬಟಾಣಿ', price: 60, oldPrice: 80, desc: 'Sweet green peas' },
  { en: 'Capsicum', hi: 'शिमला मिर्च', kn: 'ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ', price: 50, oldPrice: 70, desc: 'Crisp green bell pepper' },
  { en: 'Beetroot', hi: 'चुकंदर', kn: 'ಬೀಟ್ರೂಟ್', price: 40, oldPrice: 50, desc: 'Sweet earthy beetroot' },
  { en: 'Radish', hi: 'मूली', kn: 'ಮೂಲಂಗಿ', price: 30, oldPrice: 40, desc: 'Crisp white radish' },
  { en: 'Pumpkin', hi: 'कद्दू', kn: 'ಕುಂಬಳಕಾಯಿ', price: 25, oldPrice: 35, desc: 'Sweet yellow pumpkin' },
  { en: 'Bottle Gourd', hi: 'लौकी', kn: 'ಸೋರೆಕಾಯಿ', price: 20, oldPrice: 30, desc: 'Fresh bottle gourd' },
  { en: 'Bitter Gourd', hi: 'करेला', kn: 'ಹಾಗಲಕಾಯಿ', price: 35, oldPrice: 45, desc: 'Healthy bitter gourd' }
];

export const categoriesList = [
  'For You',
  'Fashion',
  'Mobiles',
  'Electronics',
  'Beauty',
  'Home',
  'Appliances',
  'Toys, Baby & More',
  'Food & Health',
  'Auto Accessories',
  'Sports & Fitness',
  'Furniture',
  'Books & Stationery',
  '2 Wheelers',
  'Vegetables'
];

const productNames = {
  Fashion: [
    'Snitch Oversized Cuban Printed Shirt', 'Snitch Slim Fit Cargo Trousers', 'Snitch Linen Casual Shirt', 'Snitch Vintage Denim Jacket',
    'Nike Air Max Sneakers', 'Adidas Ultraboost Running Shoes', "Levi's 501 Original Jeans", 'Zara Slim Fit Jacket', 'H&M Classic Fleece Hoodie',
    'Puma RS-X Retro Shoes', 'Roadster Casual Denim Shirt', 'U.S. Polo Assn. Polo T-Shirt', 'Jack & Jones Leather Jacket', 'Allen Solly Formal Shirt',
    'Woodland Waterproof Leather Boots', 'Tommy Hilfiger Casual Blazer', 'Vero Moda Women Floral Dress', 'Only Cotton Casual Top', 'Fabindia Silk Kurta'
  ],
  Mobiles: [
    'Samsung A36 5G', 'vivo T5 Pro 5G', 'iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 14 Ultra',
    'Vivo X100 Pro', 'Nothing Phone (2)', 'Motorola Edge 50 Pro', 'Realme 12 Pro+', 'Poco X6 Pro', 'Redmi Note 13 Pro', 'Samsung Galaxy A55', 'OnePlus Nord CE4',
    'iPhone 15 Plus', 'Google Pixel 8a', 'IQOO 12 5G', 'Oppo Reno 11 Pro', 'Vivo V30 Pro'
  ],
  Electronics: [
    'Sony WH-1000XM5 Headphones', 'Apple AirPods Pro (2nd Gen)', 'Bose QuietComfort Ultra', 'JBL Flip 6 Bluetooth Speaker', 'LG C3 55-inch OLED TV',
    'Apple iPad Pro 11-inch', 'Samsung Galaxy Tab S9', 'HP Pavilion 15 Laptop', 'ASUS ROG Strix Gaming Laptop', 'Apple MacBook Air M3',
    'Dell Inspiron 14 Thin Laptop', 'Lenovo IdeaPad 3', 'Logitech MX Master 3S Mouse', 'Keychron K2 Mechanical Keyboard', 'OnePlus Buds 3 TWS'
  ],
  Beauty: [
    'L\'Oréal Paris Hyaluronic Acid Serum', 'Cetaphil Gentle Skin Cleanser', 'Nivea Soft Light Moisturiser', 'Lakmé Absolute Wet & Dry Foundation', 'Maybelline New York Fit Me Matte Poreless',
    'Sugar Cosmetics Matte Attack Lipstick', 'Neutrogena Hydro Boost Water Gel', 'The Derma Co 10% Niacinamide Serum', 'Plum Green Tea Pore Cleansing Face Wash', 'MCaffeine Naked & Raw Coffee Face Scrub',
    'Minimalist 10% Vitamin C Face Serum', 'Mamaearth Onion Hair Fall Control Oil'
  ],
  Home: [
    'Wakefit Orthopaedic Memory Foam Mattress', 'Borosil Vision Glass Tumbler Set of 6', 'Milton Thermosteel Water Bottle 1L',
    'Solimo Non-Stick Cookware Set of 3', 'Kuber Industries 6-Piece Wardrobe Organiser', 'Sleepwell Dual Comfort Mattress', 'Godrej Aer Spray Home Air Freshener'
  ],
  Appliances: [
    'LG 8kg Front Load Washing Machine', 'Samsung 324L Double Door Refrigerator', 'Daikin 1.5 Ton 5 Star Inverter AC', 'Philips Digital Air Fryer XL',
    'Bosch 13 Place Settings Dishwasher', 'IFB 30L Convection Microwave Oven', 'Prestige Deluxe Pressure Cooker 3L', 'Bajaj Rex 500W Mixer Grinder', 'Pigeon 1.5L Electric Kettle'
  ],
  'Toys, Baby & More': [
    'LEGO Classic Bricks Building Set 790 Pcs', 'Pampers Baby Dry Diapers Pants XL', 'Giant Soft Plush Teddy Bear 4ft', 'Hot Wheels 10-Car Collector Pack',
    'Chicco KeyFit 30 Infant Car Seat', 'Fisher-Price Kick & Play Piano Gym', 'Barbie Dreamhouse Playset'
  ],
  'Food & Health': [
    'Optimum Nutrition Gold Standard Whey 2kg', 'Quaker Oats Whole Grain 1kg', 'Organic Tattva Raw Chia Seeds 250g', 'Fast&Up Charge Vitamin C 20 Tablets',
    'Muscletech Nitrotech Protein Powder', 'Brooke Bond Red Label Tea 1kg', 'Aashirvaad Shudh Chakki Atta 10kg', 'Saffola Gold Cooking Oil 5L'
  ],
  'Auto Accessories': [
    'Vega Off-Road Full Face Helmet', 'Bosch Universal Aquatak High Pressure Washer', '70mai Smart Dash Cam Pro Plus', 'TVS Racing Leather Riding Gloves',
    'Autofy Anti-Theft Heavy Bike Lock', 'Solimo All-Weather Car Cover'
  ],
  'Sports & Fitness': [
    'NIVIA Storm Football Size 5', 'Yonex Muscle Power 29 Badminton Racquet', 'MRF Genius Grand Edition Cricket Bat', 'Adrenex Heavy Duty Badminton Net',
    'Boldfit Anti-Slip Yoga Mat 6mm', 'Cultsport Treadmill for Home Gym', 'Decathlon Dumbbells 10kg Set'
  ],
  Furniture: [
    'Sleepyhead 3-Seater Fabric Sofa', 'Green Soul Ergonomic Gaming Office Chair', 'Solimo Solid Wood Study Table', 'Wakefit King Size Sheesham Wood Bed',
    'DeckUp Plank Bookcase Cabinet'
  ],
  'Books & Stationery': [
    'Atomic Habits by James Clear', 'Psychology of Money by Morgan Housel', 'Classmate Pulse Spiral Notebook 6-Pack', 'Parker Vector Stainless Steel Fountain Pen',
    'Faber-Castell 48 Color Pencils Set', 'Rich Dad Poor Dad by Robert Kiyosaki'
  ],
  '2 Wheelers': [
    'Ather 450X Electric Scooter', 'Ola S1 Pro Gen 2 EV Scooter', 'TVS iQube Electric Scooter', 'Hero Electric Optima CX EV', 'Royal Enfield Hunter 350 Access'
  ]
};

export const productImageMap = {
  // Snitch & Fashion
  'Snitch Oversized Cuban Printed Shirt': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
  'Snitch Slim Fit Cargo Trousers': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
  'Snitch Linen Casual Shirt': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
  'Snitch Vintage Denim Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
  'Nike Air Max Sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  'Adidas Ultraboost Running Shoes': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
  "Levi's 501 Original Jeans": 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
  'Zara Slim Fit Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
  'H&M Classic Fleece Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
  'Puma RS-X Retro Shoes': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',

  // Mobiles
  'Samsung A36 5G': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
  'vivo T5 Pro 5G': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
  'iPhone 15 Pro Max': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
  'Samsung Galaxy S24 Ultra': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
  'Google Pixel 8 Pro': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
  'OnePlus 12': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',

  // Electronics
  'Sony WH-1000XM5 Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  'Apple AirPods Pro (2nd Gen)': 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
  'Apple MacBook Air M3': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',

  // Appliances
  'LG 8kg Front Load Washing Machine': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80',
  'Samsung 324L Double Door Refrigerator': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80',
  'Daikin 1.5 Ton 5 Star Inverter AC': 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&q=80',
  'Philips Digital Air Fryer XL': 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&q=80',

  // Toys & Baby
  'LEGO Classic Bricks Building Set 790 Pcs': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
  'Pampers Baby Dry Diapers Pants XL': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
  'Giant Soft Plush Teddy Bear 4ft': 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80',
  'Hot Wheels 10-Car Collector Pack': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80',

  // Food & Health
  'Optimum Nutrition Gold Standard Whey 2kg': 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80',
  'Quaker Oats Whole Grain 1kg': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=80',
  'Organic Tattva Raw Chia Seeds 250g': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',

  // Auto Accessories
  'Vega Off-Road Full Face Helmet': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
  'Bosch Universal Aquatak High Pressure Washer': 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80',
  '70mai Smart Dash Cam Pro Plus': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80',

  // Sports & Fitness
  'NIVIA Storm Football Size 5': 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&q=80',
  'Yonex Muscle Power 29 Badminton Racquet': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80',
  'MRF Genius Grand Edition Cricket Bat': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80',
  'Adrenex Heavy Duty Badminton Net': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80',
  'Boldfit Anti-Slip Yoga Mat 6mm': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',

  // Furniture
  'Sleepyhead 3-Seater Fabric Sofa': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'Green Soul Ergonomic Gaming Office Chair': 'https://images.unsplash.com/photo-1580481072645-022f9a6d1209?w=600&q=80',
  'Solimo Solid Wood Study Table': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',

  // Books & Stationery
  'Atomic Habits by James Clear': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
  'Psychology of Money by Morgan Housel': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
  'Classmate Pulse Spiral Notebook 6-Pack': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&q=80',
  'Parker Vector Stainless Steel Fountain Pen': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80',

  // 2 Wheelers
  'Ather 450X Electric Scooter': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
  'Ola S1 Pro Gen 2 EV Scooter': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80',
  'TVS iQube Electric Scooter': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',

  // Vegetables
  'Carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
  'Tomato': 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&q=80',
  'Onion': 'https://images.unsplash.com/photo-1635450672547-bf600c193d3d?w=400&q=80',
  'Cabbage': 'https://images.unsplash.com/photo-1768113802440-cb8b176a591c?w=400&q=80',
  'Cauliflower': 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?w=400&q=80',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
  'Cucumber': 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&q=80',
  'Broccoli': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Lemon': 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80',
  'Ginger': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
  'Garlic': 'https://images.unsplash.com/photo-1555465910-31f7f20a184d?w=400&q=80',
  'Green Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80',
  'Coriander': 'https://images.unsplash.com/photo-1588879460618-9249e7d947d1?w=400&q=80',
  'Mint': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
  'Sweet Potato': 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=400&q=80',
  'Ladies Finger': 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80',
  'Brinjal': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
  'Green Peas': 'https://images.unsplash.com/photo-1782085168815-09b19ba1c744?w=400&q=80',
  'Capsicum': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
  'Beetroot': 'https://images.unsplash.com/photo-1758151748972-6840ed51058a?w=400&q=80',
  'Radish': 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?w=400&q=80',
  'Pumpkin': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80',
  'Bottle Gourd': 'https://images.unsplash.com/photo-1535734442109-da3c28a9e51e?w=400&q=80',
  'Bitter Gourd': 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&q=80'
};

const products = [];
let idCounter = 1;

for (const cat of Object.keys(productNames)) {
  const names = productNames[cat];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    let basePrice;
    if (cat === 'Mobiles') basePrice = 14000 + i * 5000;
    else if (cat === 'Fashion') basePrice = 699 + i * 350;
    else if (cat === 'Electronics') basePrice = 2499 + i * 2000;
    else if (cat === 'Beauty') basePrice = 299 + i * 120;
    else if (cat === 'Appliances') basePrice = 4999 + i * 3500;
    else if (cat === 'Sports & Fitness') basePrice = 799 + i * 650;
    else if (cat === 'Auto Accessories') basePrice = 899 + i * 1200;
    else if (cat === 'Toys, Baby & More') basePrice = 499 + i * 600;
    else if (cat === 'Furniture') basePrice = 3499 + i * 2500;
    else if (cat === 'Books & Stationery') basePrice = 299 + i * 150;
    else if (cat === '2 Wheelers') basePrice = 84999 + i * 15000;
    else basePrice = 399 + i * 300;

    const catOffset = cat.length;
    const itemVariance = (i * 7 + catOffset * 3) % 45;
    const markupPercent = 0.15 + itemVariance / 100;
    const oldPrice = Math.round(basePrice * (1 + markupPercent));
    const rating = parseFloat((4.0 + (i % 10) / 10).toFixed(1));
    const reviews = 150 + i * 240;
    const delivery = (cat === 'Food & Health' || cat === 'Beauty') ? '10 mins' : '1-2 days';
    const offers = ['SBI Card 10% Instant Discount', 'Partner Bank No Cost EMI'];

    const compare = {};
    const platformKeys = Object.keys(PLATFORMS);
    const bestPlatform = platformKeys[(i + catOffset) % platformKeys.length];
    for (const platform of platformKeys) {
      const platformDiscount = platform === bestPlatform
        ? 0.05 + ((i * 3) % 15) / 100
        : ((i * 2 + platform.length) % 10) / 100 - 0.02;
      compare[platform] = Math.round(basePrice * (1 - platformDiscount));
    }
    const bestPrice = Math.min(...Object.values(compare));

    const priceHistory = [];
    const today = new Date();
    let current = basePrice;
    for (let j = 0; j < 12; j++) {
      const date = new Date(today); date.setMonth(today.getMonth() - (11 - j));
      const noise = (Math.random() - 0.5) * 0.15;
      current = Math.round(Math.max(basePrice * 0.75, Math.min(oldPrice * 0.95, current * (1 + noise))));
      priceHistory.push({ date: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }), price: current });
    }
    priceHistory[priceHistory.length - 1].price = bestPrice;
    const pricesOnly = priceHistory.map(p => p.price);
    const avgPrice = Math.round(pricesOnly.reduce((a, b) => a + b, 0) / pricesOnly.length);
    const lowestPrice = Math.min(...pricesOnly);
    const highestPrice = Math.max(...pricesOnly);
    const competitorPrices = Object.values(compare);
    const avgComp = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
    const compAdvantage = (avgComp - bestPrice) / avgComp;
    const discountPercent = Math.round((oldPrice - bestPrice) / oldPrice * 100);
    const discount = `${discountPercent}% OFF`;
    let dealScore = Math.min(1, Math.max(0, (discountPercent / 100) * 0.5 + compAdvantage * 0.3 + (bestPrice < avgPrice ? 0.2 : 0)));
    const isGoodTime = dealScore > 0.6;

    products.push({
      id: idCounter++,
      category: cat,
      name,
      desc: 'Premium original product • Verified Brand Warranty',
      price: bestPrice,
      oldPrice,
      rating,
      reviews,
      delivery,
      discount,
      offers,
      compare,
      image: productImageMap[name] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      priceHistory,
      avgPrice,
      lowestPrice,
      highestPrice,
      dealScore,
      buyRecommendation: isGoodTime ? 'Go Ahead & Buy now' : 'Wait for better price',
      recommendationSub: isGoodTime ? 'Optimal price point' : 'Price may drop further',
      isGoodTime
    });
  }
}

for (const veg of vegetablesList) {
  const { price, oldPrice } = veg;
  const rating = parseFloat((4.1 + Math.random() * 0.8).toFixed(1));
  const reviews = Math.floor(Math.random() * 2000) + 120;
  const compare = {};
  const platformKeys = Object.keys(PLATFORMS);
  const bestPlatform = platformKeys[Math.floor(Math.random() * platformKeys.length)];
  for (const platform of platformKeys) {
    compare[platform] = platform === bestPlatform ? Math.round(price * 0.88) : Math.round(price * (0.92 + Math.random() * 0.15));
  }
  const bestPrice = Math.min(...Object.values(compare));
  const discountPercent = Math.round((oldPrice - bestPrice) / oldPrice * 100);
  const priceHistory = [];
  const today = new Date();
  let current = price;
  for (let j = 0; j < 12; j++) {
    const date = new Date(today); date.setMonth(today.getMonth() - (11 - j));
    current = Math.round(Math.max(price * 0.75, Math.min(oldPrice * 0.95, current * (1 + (Math.random() - 0.5) * 0.15))));
    priceHistory.push({ date: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }), price: current });
  }
  priceHistory[priceHistory.length - 1].price = bestPrice;
  const pricesOnly = priceHistory.map(p => p.price);
  const avgPrice = Math.round(pricesOnly.reduce((a, b) => a + b, 0) / pricesOnly.length);
  const competitorPrices = Object.values(compare);
  const avgComp = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
  let dealScore = Math.min(1, Math.max(0, (discountPercent / 100) * 0.5 + ((avgComp - bestPrice) / avgComp) * 0.3 + (bestPrice < avgPrice ? 0.2 : 0)));
  const isGoodTime = dealScore > 0.6;
  products.push({
    id: idCounter++,
    category: 'Vegetables',
    name: veg.en,
    desc: `${veg.desc} • Fresh Farm Quality`,
    price: bestPrice,
    oldPrice,
    rating,
    reviews,
    delivery: '10 mins - 1 day',
    discount: `${discountPercent}% OFF`,
    offers: ['Fresh Stock Daily', 'Free Delivery Available'],
    compare,
    image: productImageMap[veg.en] || 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80',
    priceHistory,
    avgPrice,
    lowestPrice: Math.min(...pricesOnly),
    highestPrice: Math.max(...pricesOnly),
    dealScore,
    buyRecommendation: isGoodTime ? 'Go Ahead & Buy now' : 'Wait for better price',
    recommendationSub: isGoodTime ? 'Optimal price point' : 'Price may drop further',
    isGoodTime
  });
}

export const demoOrders = [
  { id: 'BM2024001', name: 'iPhone 15 Pro Max', date: 'Jun 18, 2026', status: 'delivered', amount: 134900, image: productImageMap['iPhone 15 Pro Max'], steps: [{ label: 'Order Placed', desc: 'Jun 18, 2:30 PM', done: true }, { label: 'Confirmed', desc: 'Jun 18, 3:00 PM', done: true }, { label: 'Shipped', desc: 'Jun 19, 10:00 AM', done: true }, { label: 'Out for Delivery', desc: 'Jun 20, 9:00 AM', done: true }, { label: 'Delivered', desc: 'Jun 20, 2:45 PM', done: true }] },
  { id: 'BM2024002', name: 'Sony WH-1000XM5 Headphones', date: 'Jun 20, 2026', status: 'shipped', amount: 24990, image: productImageMap['Sony WH-1000XM5 Headphones'], steps: [{ label: 'Order Placed', desc: 'Jun 20, 11:00 AM', done: true }, { label: 'Confirmed', desc: 'Jun 20, 11:30 AM', done: true }, { label: 'Shipped', desc: 'Jun 21, 8:00 AM', done: true }, { label: 'Out for Delivery', desc: 'Expected Jun 22', done: false }, { label: 'Delivered', desc: 'Expected Jun 22', done: false }] },
  { id: 'BM2024003', name: 'Nike Air Max Sneakers', date: 'Jun 21, 2026', status: 'processing', amount: 12995, image: productImageMap['Nike Air Max Sneakers'], steps: [{ label: 'Order Placed', desc: 'Jun 21, 9:00 AM', done: true }, { label: 'Confirmed', desc: 'Jun 21, 9:30 AM', done: true }, { label: 'Shipped', desc: 'Expected Jun 22', done: false }, { label: 'Out for Delivery', desc: 'Expected Jun 23', done: false }, { label: 'Delivered', desc: 'Expected Jun 23', done: false }] }
];

export default products;
