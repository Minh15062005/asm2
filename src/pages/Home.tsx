import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../context/CartContext"; // Import Context giỏ hàng
import IProduct from "../interfaces/product";
import "./css/styles.css";

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ hàng

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        if (data) {
          setProducts(data);
          setFeaturedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm xử lý khi nhấn nút mua hàng
  const handleBuyNow = (product: IProduct) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    navigate("/cart"); // Chuyển hướng sang trang giỏ hàng
  };

  return (
    <div>
      {/* Header */}
      <header className="text-center text-faded d-none d-lg-block">
        <h1 className="site-heading">
          <span className="site-heading-upper text-primary mb-3">Product Showcase</span>
          <span className="site-heading-lower">Our Featured Items</span>
        </h1>
      </header>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark py-lg-4">
  <div className="container">
    <a className="navbar-brand text-uppercase fw-bold" href="#">Product Store</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Products</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

      {/* Danh sách sản phẩm */}
      <section className="page-section">
        <div className="container">
          <h2 className="text-center text-primary">Danh sách sản phẩm</h2>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-6">
                <div className="card border-0 shadow-lg rounded-4 p-3 h-100">
                  <img 
                    src={product.thumbnail} 
                    className="card-img-top" 
                    alt={product.title} 
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="card-body">
                    <h5 
                      className="card-title" 
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price} VND</p>
                    <button className="btn btn-success w-100" onClick={() => handleBuyNow(product)}>
                      🛒 Mua hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="page-section">
        <div className="container">
          <h2 className="text-center text-danger">✨ Sản phẩm nổi bật ✨</h2>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-6">
                <div className="card border-0 shadow-lg rounded-4 p-3 h-100">
                  <img 
                    src={product.thumbnail} 
                    className="card-img-top" 
                    alt={product.title} 
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="card-body">
                    <h5 
                      className="card-title" 
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price} VND</p>
                    <button className="btn btn-warning w-100" onClick={() => handleBuyNow(product)}>
                      🛒 Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
  <div className="container">
    <p className="m-0 small">&copy; Your Website 2023</p>
  </div>
</footer>
    </div>
  );
}

export default Home;
