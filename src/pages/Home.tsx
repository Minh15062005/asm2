import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import AuthContext
import { useCart } from "../context/CartContext";  // Import CartContext
import IProduct from "../interfaces/product";
import "./css/styles.css";

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // Lấy thông tin user từ AuthContext

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

  // Xử lý khi nhấn "Mua hàng"
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
      <header className="text-center text-faded d-none d-lg-block mb-4">
        <h1 className="site-heading">
          <span className="site-heading-upper text-primary mb-3">Product Showcase</span>
          <span className="site-heading-lower">Our Featured Items</span>
        </h1>
      </header>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark py-lg-4">
        <div className="container">
          <Link className="navbar-brand text-uppercase fw-bold" to="/">Product Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Contact</Link></li>
            </ul>
            <div className="d-flex align-items-center">
              {user ? (
                <span className="text-light me-3">👋 Xin chào, {user.name}</span>
              ) : (
              <span className="text-light me-3">👋 Xin chào</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Thông báo chào mừng */}
      <section className="text-center my-4">
        {user ? (
          <h2 className="text-success">Xin chào, <strong>{user.name}</strong>! Chào mừng bạn quay trở lại. 🎉</h2>
        ) : (
          <h2 className="text-warning">
            Vui lòng <Link to="/login">đăng nhập</Link> để trải nghiệm mua sắm tốt nhất!
          </h2>
        )}
      </section>

      {/* Danh sách sản phẩm */}
      <section className="page-section">
        <div className="container">
          <h2 className="text-center text-primary mb-4">Danh sách sản phẩm</h2>
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
                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price.toLocaleString()} VND</p>
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
      <section className="page-section bg-light">
        <div className="container">
          <h2 className="text-center text-danger mb-4">✨ Sản phẩm nổi bật ✨</h2>
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
                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price.toLocaleString()} VND</p>
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
      <footer className="bg-dark text-light text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Liên hệ</h5>
              <p>Địa chỉ: Trịnh Văn Bô</p>
              <p>Email: bildas@gmail.com</p>
              <p>Điện thoại: 0963802138</p>
            </div>
            <div className="col-md-4">
              <h5>Thông tin</h5>
              <ul className="list-unstyled">
                <li><Link className="text-light" to="/about">Giới thiệu</Link></li>
                <li><Link className="text-light" to="/news">Tin tức</Link></li>
                <li><Link className="text-light" to="/products">Sản phẩm</Link></li>
                <li><Link className="text-light" to="/orders">Đơn hàng của bạn</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Mạng xã hội</h5>
              <a href="https://facebook.com" className="text-light me-2" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" className="text-light me-2" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <p className="mt-3 mb-0 small">&copy; WEBSITE BÁN GẬY BLIDA</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
