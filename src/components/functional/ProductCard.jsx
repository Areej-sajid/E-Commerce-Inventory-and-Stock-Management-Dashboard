
function ProductCard({ product, onDelete, onUpdate }) {
  let status = "In Stock";

  if (product.stock === 0) {
    status = "Out of Stock";
  } else if (product.stock <= 5) {
    status = "Low Stock";
  }

  function handleUpdate() {
    const value = prompt(
      "Enter new stock quantity:",
      product.stock
    );

    if (value === null || value.trim() === "") {
      return;
    }

    const quantity = Number(value);

    if (Number.isInteger(quantity) && quantity >= 0) {
      onUpdate(product.id, quantity);
    } else {
      alert("Please enter a valid whole number.");
    }
  }

  return (
    <article className="product-card">
      <div className="product-top">
        <div className="product-icon">
          {product.name.charAt(0).toUpperCase()}
        </div>

        <span
          className={`badge ${status.toLowerCase().replaceAll(" ", "-")}`}
        >
          {status}
        </span>
      </div>

      <h3>{product.name}</h3>
      <p className="muted">{product.category}</p>

      <div className="product-details">
        <div>
          <span className="muted">Price</span>
          <strong>Rs. {product.price.toLocaleString()}</strong>
        </div>

        <div>
          <span className="muted">Stock</span>
          <strong>{product.stock} units</strong>
        </div>
      </div>

      <button
        className="update-btn"
        onClick={handleUpdate}
      >
        Update Stock
      </button>

      <button
        className="delete-btn"
        onClick={() => onDelete(product.id)}
      >
        Delete Product
      </button>
    </article>
  );
}

export default ProductCard;
