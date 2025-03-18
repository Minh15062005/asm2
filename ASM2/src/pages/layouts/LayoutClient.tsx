import { Link, Outlet } from "react-router-dom";
import { useCart } from "../../context/CartContext";


function LayoutClient() {
  const { cart } = useCart(); // Lấy dữ liệu giỏ hàng

  return (
    <>
      {/* 🚀 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            🏠 Trang chủ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/products">🛒 Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">📰 Tin tức</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">ℹ️ Giới thiệu</Link>
              </li>
            </ul>
        
            {/* 🛒 Giỏ hàng */}
            <Link className="btn btn-outline-success position-relative me-3" to="/cart">
              🛒 Giỏ hàng
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </Link>
            <div>
              <Link className="btn btn-outline-primary me-2" to="/login">🔑 Đăng nhập</Link>
              <Link className="btn btn-primary" to="/register">📝 Đăng ký</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 🚀 Nội dung chính */}
      <div className="container mt-4">
        <Outlet />
      </div>

      {/* 🚀 Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 Website của bạn. All rights reserved.</p>
      </footer>
    </>
  );
}

export default LayoutClient;
