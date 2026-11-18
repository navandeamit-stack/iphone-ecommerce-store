import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./productcard";
import { getProducts, getProduct, placeOrder } from "./api";
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
  iphone1Image, iphone2Image, iphone3Image, iphone4Image,
  iphone5Image, iphone6Image, iphone7Image, iphone8Image,
  iphone9Image, iphone10Image, iphone11Image, iphone12Image,
  iphone13Image, iphone14Image, iphone15Image, iphone16Image,
  iphone17Image, iphone18Image
];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const openProductDetails = async (productId) => {
    setDetailLoading(true);
    setDetailError("");
    setSelectedProduct(null);

    try {
      const product = await getProduct(productId);
      setSelectedProduct(product);
    } catch (err) {
      setDetailError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setDetailError("");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async (event) => {
    event.preventDefault();
    setCheckingOut(true);
    setCheckoutMessage("");

    try {
      for (const item of cart) {
        await placeOrder({
          customer_name: customerName,
          email,
          product_id: item.id,
          quantity: item.quantity
        });
      }
      setCheckoutMessage("Order placed successfully!");
      setCart([]);
      setCustomerName("");
      setEmail("");

      const refreshedProducts = await getProducts();
      setProducts(refreshedProducts);
    } catch (err) {
      setCheckoutMessage(err.message);
    } finally {
      setCheckingOut(false);
    }
  };

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
        <img className="hero-image" src={iphoneImage} alt="iPhone 18 Pro in four colors" />
      </section>

      <section className="shop" id="products">
        <div className="shop-heading">
          <div>
            <h2>Our Collection</h2>
            <p>Live catalogue from the FastAPI backend</p>
          </div>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search your iPhone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="empty">Loading products...</p>}
        {error && <p className="empty">Unable to load products: {error}</p>}

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: product.image_url || productImages[(product.id - 1) % productImages.length]
              }}
              addToCart={addToCart}
              onViewDetails={openProductDetails}
            />
          ))}
        </div>

        {!loading && !error && filteredProducts.length === 0 && (
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
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}

              <h3 className="total">Total: ₹{total.toLocaleString("en-IN")}</h3>

              <form className="checkout-form" onSubmit={checkout}>
                <input
                  type="text"
                  placeholder="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="checkout" type="submit" disabled={checkingOut}>
                  {checkingOut ? "Placing order..." : "Proceed to Checkout"}
                </button>
              </form>
              {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
            </>
          )}
        </section>
      )}

      {(detailLoading || detailError || selectedProduct) && (
        <div className="product-modal-backdrop" onClick={closeProductDetails}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Product details"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={closeProductDetails} aria-label="Close">
              ×
            </button>

            {detailLoading && <p className="modal-loading">Loading product details...</p>}
            {detailError && <p className="modal-error">{detailError}</p>}

            {selectedProduct && (
              <div className="product-modal-content">
                <img
                  className="modal-product-image"
                  src={selectedProduct.image_url || productImages[(selectedProduct.id - 1) % productImages.length]}
                  alt={selectedProduct.name}
                />
                <div className="modal-product-info">
                  <p className="product-label">SMARTPHONE</p>
                  <h2>{selectedProduct.name}</h2>
                  <p>{selectedProduct.description}</p>
                  <h3>₹{selectedProduct.price.toLocaleString("en-IN")}</h3>
                  <p className={selectedProduct.stock > 0 ? "in-stock" : "out-of-stock"}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Out of stock"}
                  </p>
                  <button
                    type="button"
                    disabled={selectedProduct.stock <= 0}
                    onClick={() => {
                      addToCart({
                        ...selectedProduct,
                        image: selectedProduct.image_url || productImages[(selectedProduct.id - 1) % productImages.length]
                      });
                      closeProductDetails();
                    }}
                  >
                    {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
