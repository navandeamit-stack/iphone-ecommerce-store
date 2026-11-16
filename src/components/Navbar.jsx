function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <h2>Apple<span>Store.</span></h2>

      <div className="nav-links">
        <a href="#products">Products</a>
        <button onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;