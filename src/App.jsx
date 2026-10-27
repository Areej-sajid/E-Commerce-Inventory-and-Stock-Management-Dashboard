
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef
} from "react";

import ThemeContext from "./Context/ThemeContext";
import ProductForm from "./components/functional/ProductForm";
import ProductList from "./components/functional/ProductList";
import CardWrapper from "./components/functional/CardWrapper";
import AuditLogger from "./components/class/AuditLogger";

function Header() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">S</div>

        <div>
          <h2>Stockly</h2>
          <p>Inventory Management</p>
        </div>
      </div>

      <button
        className="theme-btn"
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀ Light Mode" : "☾ Dark Mode"}
      </button>
    </header>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  const loggerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("inventoryProducts");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setProducts(parsed);
        }
      }
    } catch {
      localStorage.removeItem("inventoryProducts");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "inventoryProducts",
        JSON.stringify(products)
      );
    }

    document.title = `Stockly | ${products.length} Products`;
  }, [products, loaded]);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, product]);

    loggerRef.current?.addLog(
      `Added ${product.name}`
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (product) {
      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      loggerRef.current?.addLog(
        `Deleted ${product.name}`
      );
    }
  }, [products]);

  const updateStock = useCallback((id, quantity) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (product && product.stock !== quantity) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, stock: quantity }
            : item
        )
      );

      loggerRef.current?.addLog(
        `Updated ${product.name} stock to ${quantity}`
      );
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      let matchesStock = true;

      if (stockFilter === "In Stock") {
        matchesStock = product.stock > 5;
      } else if (stockFilter === "Low Stock") {
        matchesStock =
          product.stock > 0 && product.stock <= 5;
      } else if (stockFilter === "Out of Stock") {
        matchesStock = product.stock === 0;
      }

      return matchesName && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  const totalStock = useMemo(() => {
    return products.reduce(
      (sum, item) => sum + item.stock,
      0
    );
  }, [products]);

  const inventoryValue = useMemo(() => {
    return products.reduce(
      (sum, item) => sum + item.price * item.stock,
      0
    );
  }, [products]);

  const lowStock = products.filter(
    (item) => item.stock > 0 && item.stock <= 5
  ).length;

  const outOfStock = products.filter(
    (item) => item.stock === 0
  ).length;

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={`app ${dark ? "dark" : ""}`}>
        <Header />

        <main className="dashboard">
          <section className="welcome">
            <div>
              <span className="eyebrow">OVERVIEW</span>

              <h1>Inventory Dashboard</h1>

              <p>
                Manage your products and keep your stock organized.
              </p>
            </div>

            <div className="date-chip">
              {new Date().toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </div>
          </section>

          <section className="metrics">
            <div className="metric-card purple">
              <span>Total Products</span>
              <strong>{products.length}</strong>
              <small>Products in inventory</small>
            </div>

            <div className="metric-card blue">
              <span>Total Units</span>
              <strong>{totalStock.toLocaleString()}</strong>
              <small>Available stock units</small>
            </div>

            <div className="metric-card green">
              <span>Inventory Value</span>
              <strong>
                Rs. {inventoryValue.toLocaleString()}
              </strong>
              <small>Price × stock quantity</small>
            </div>

            <div className="metric-card orange">
              <span>Stock Alerts</span>
              <strong>{lowStock + outOfStock}</strong>
              <small>
                {lowStock} low · {outOfStock} out
              </small>
            </div>
          </section>

          <CardWrapper title="Add New Product">
            <ProductForm onAdd={addProduct} />
          </CardWrapper>

          <CardWrapper title="Product Inventory">
            <div className="filters">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home</option>
                <option>Accessories</option>
                <option>Other</option>
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                aria-label="Filter by stock status"
              >
                <option>All</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <ProductList
              products={filteredProducts}
              onDelete={deleteProduct}
              onUpdate={updateStock}
            />
          </CardWrapper>

          <CardWrapper title="Audit Log">
            <AuditLogger ref={loggerRef} />
          </CardWrapper>

          <footer className="footer">
            <span>Stockly Inventory Dashboard</span>
            <span>Built with React + Vite</span>
          </footer>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
