import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import './css/styles.css';

function LayoutClient() {
  const { cart } = useCart(); // Lấy dữ liệu giỏ hàng
  const { user, logout } = useAuth(); // Lấy thông tin user từ AuthContext
  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Agency - Start Bootstrap Theme</title>
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
      {/* Font Awesome icons (free version) */}
      {/* Google fonts */}
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
      {/* Core theme CSS (includes Bootstrap) */}
      <link href="css/styles.css" rel="stylesheet" />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Agency - Start Bootstrap Theme</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" />
      </Helmet>
      {/* Navigation */}
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
              {cart?.length > 0 && (
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

      <div className="container mt-4">
        <Outlet />
      </div>


      {/* Footer */}
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">Bản quyền © Website của bạn 2023</div>
            <div className="col-lg-4 my-3 my-lg-0">
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" width="30" />
              </a>
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook">
                <img src="https://coachingskills.vn/wp-content/uploads/2024/07/facebook-logo-icon-facebook-icon-png-images-icons-and-png-backgrounds-1.png" alt="Facebook" width="30" />
              </a>
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" alt="LinkedIn" width="30" />
              </a>
            </div>

            <div className="col-lg-4 text-lg-end">
              <a className="link-dark text-decoration-none me-3" href="#!">Chính sách bảo mật</a>
              <a className="link-dark text-decoration-none" href="#!">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modals */}
      {/* Example for modal 1 */}
      <div className="portfolio-modal modal fade" id="portfolioModal1" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Đóng modal" /></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-body">
                    <h2 className="text-uppercase">Tên dự án</h2>
                    <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                    <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/1.jpg" alt="..." />
                    <p>Sử dụng khu vực này để mô tả dự án của bạn. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                    <ul className="list-inline">
                      <li>
                        <strong>Khách hàng:</strong>
                        Threads
                      </li>
                      <li>
                        <strong>Thể loại:</strong>
                        Illustration
                      </li>
                    </ul>
                    <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                      <i className="fas fa-xmark me-1" />
                      Đóng dự án
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat for other modals */}
    </div>
  );
};

export default LayoutClient;