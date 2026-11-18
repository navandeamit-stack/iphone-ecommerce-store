function ProductCard({ product, addToCart, onViewDetails }) {
  return (
    <article
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(product.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onViewDetails(product.id);
        }
      }}
    >

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

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          addToCart(product);
        }}
      >
        Add to Cart
      </button>

    </article>
  );
}

export default ProductCard;