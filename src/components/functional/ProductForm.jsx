
import { useRef, useState } from "react";

function ProductForm({ onAdd }) {
  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || price === "" || stock === "") {
      alert("Please fill all fields.");
      return;
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      alert("Price and stock cannot be negative.");
      return;
    }

    onAdd({
      id: Date.now(),
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock)
    });

    setName("");
    setPrice("");
    setStock("");
    nameRef.current.focus();
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Product Name
          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Wireless Headphones"
            required
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home</option>
            <option>Accessories</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Price (Rs.)
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2500"
            required
          />
        </label>

        <label>
          Stock Quantity
          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="20"
            required
          />
        </label>
      </div>

      <button type="submit" className="primary-btn">
        + Add Product
      </button>
    </form>
  );
}

export default ProductForm;
