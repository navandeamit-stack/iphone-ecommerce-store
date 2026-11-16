import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./productcard";
import iphoneImage from "./assets/iphone.png";
import iphone1Image from "./assets/iphone-1. png.webp";
import iphone2Image from "./assets/iphone-2.png";
import iphone3Image from "./assets/iphone-3.png";
import iphone4Image from "./assets/iphone-4.png";
import iphone5Image from "./assets/iphone-5 .png";
import iphone6Image from "./assets/iphone-6 .png";
import iphone7Image from "./assets/iphone-7.png";
import iphone8Image from "./assets/iphone-8.png";
import iphone9Image from "./assets/iphone-9.png";
import iphone10Image from "./assets/iphone-10.png";
import iphone11Image from "./assets/iphone-11.png";
import iphone12Image from "./assets/iphone-12,png.webp";
import iphone13Image from "./assets/iphone-13.png";
import iphone14Image from "./assets/iphone-14.png";
import iphone15Image from "./assets/iphone-15.png";
import iphone16Image from "./assets/iphone-16.png";
import iphone17Image from "./assets/iphone-17.png";
import iphone18Image from "./assets/iphone-18.png";
import "./App.css";

const productImages = [
  iphone1Image,
  iphone2Image,
  iphone3Image,
  iphone4Image,
  iphone5Image,
  iphone6Image,
  iphone7Image,
  iphone8Image,
  iphone9Image,
  iphone10Image,
  iphone11Image,
  iphone12Image,
  iphone13Image,
  iphone14Image,
  iphone15Image,
  iphone16Image,
  iphone17Image,
  iphone18Image
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  // Demo product catalogue
  const products = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: `iPhone ${i + 1}`,
    price: 10000 + (i + 1) * 5000,
    image: productImages[i],
    description: "Premium smartphone experience"
  }));

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Search products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">

      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(!showCart)}
      />

      <section className="hero">
        <p className="tag">WELCOME TO APPLE STORE</p>
        <h1>Discover Your Next iPhone.</h1>
        <p>Explore our smartphone collection.</p>
        <a href="#products">Explore Collection ↓</a>
        <img
          className="hero-image"
          src={iphoneImage}
          alt="iPhone 18 Pro in four colors"
        />
      </section>

      <section className="shop" id="products">

        <div className="shop-heading">
          <div>
            <h2>Our Collection</h2>
            <p>Explore all 18 demo catalogue entries</p>
          </div>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search your iPhone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty">No products found.</p>
        )}

      </section>

      {showCart && (
        <section className="cart-section">
          <h2>Your Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <h3 className="total">
                Total: ₹{total.toLocaleString("en-IN")}
              </h3>

              <button className="checkout">
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      )}

      <footer>
        <h2>AppleStore.</h2>
        <p>Modern shopping experience | React E-Commerce Project</p>
        <p>© 2026 AppleStore. All rights reserved.</p>
        <p>Created by Amit Navande</p>
      </footer>

    </div>
  );
}
export default App;