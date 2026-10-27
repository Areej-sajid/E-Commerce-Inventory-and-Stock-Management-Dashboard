
import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onUpdate }) {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try another filter or add a new product.</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
