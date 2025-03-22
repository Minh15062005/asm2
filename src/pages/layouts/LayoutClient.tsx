import { Link, Outlet } from "react-router-dom";
import "../css/styles.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext


function LayoutClient() {
  const { cart } = useCart(); // Lấy dữ liệu giỏ hàng
  const { user, logout } = useAuth(); // Lấy thông tin user từ AuthContext

  return (
    <>
      {/* 🚀 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark py-lg-4 bg-primary">
        <div className="container">
          <Link className="navbar-brand text-uppercase fw-bold text-light" to="/">
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
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/products">🛍️ Sản phẩm nổi bật</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/products">ℹ️ Giới thiệu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/orders">📦 Đơn hàng của bạn</Link>
              </li>
            </ul>

            {/* 🛒 Giỏ hàng */}
            <Link className="btn btn-outline-light position-relative me-3" to="/cart">
              🛒 Giỏ hàng
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hiển thị thông tin người dùng */}
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">👤 {user.name}</span>
                <button className="btn btn-danger" onClick={logout}>🚪 Đăng xuất</button>
              </div>
            ) : (
              <div>
                <Link className="btn btn-outline-light me-2" to="/login">🔑 Đăng nhập</Link>
                <Link className="btn btn-warning" to="/register">📝 Đăng ký</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 🚀 Nội dung chính */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default LayoutClient;
