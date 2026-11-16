function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <p className="product-label">SMARTPHONE</p>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <h3>
        ₹{product.price.toLocaleString("en-IN")}
      </h3>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;