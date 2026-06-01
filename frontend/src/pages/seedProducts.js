const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohit@1234",
  database: "expense-hub"
});

const categories = [
  "Mobiles",
  "Fashion",
  "Electronics",
  "Grocery",
  "Beauty",
  "Gaming"
];

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Nike",
  "Puma",
  "Adidas",
  "Boat",
  "LG"
];

for (let i = 1; i <= 500; i++) {

  const product = {
    name: `Product ${i}`,
    category:
      categories[
        Math.floor(Math.random() * categories.length)
      ],
    price:
      Math.floor(Math.random() * 90000) + 1000,
    stock:
      Math.floor(Math.random() * 100),
    rating:
      (Math.random() * 5).toFixed(1),
    brand:
      brands[
        Math.floor(Math.random() * brands.length)
      ],
    image:
      `https://picsum.photos/seed/${i}/400/300`
  };

  connection.query(
    `INSERT INTO products 
    (name, category, price, stock, rating, brand, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      product.name,
      product.category,
      product.price,
      product.stock,
      product.rating,
      product.brand,
      product.image
    ],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

console.log("500 Products Inserted");

connection.end();