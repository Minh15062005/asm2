import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import '../css/admin.css';  // Đảm bảo đường dẫn đúng
import '../css/admin1.css';  // Đảm bảo đường dẫn đúng
const LayoutAdmin = () => {
  const { logout } = useAuth();

  return (
    <div id="wrapper">

      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin/home">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Admin Dashboard</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="/admin/home"> {/* Cập nhật đường dẫn */}
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Quản lý</div>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/product">
            <i className="fas fa-fw fa-box"></i>
            <span>Sản phẩm</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/product/add">
            <i className="fas fa-fw fa-plus"></i>
            <span>Thêm sản phẩm</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/orders">
            <i className="fas fa-fw fa-plus"></i>
            <span>Quản lý đơn hàng</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">

        {/* Main Content */}
        <div id="content">

          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">User</span>
                  <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="..." />
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#" onClick={logout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Đăng xuất
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          {/* End of Topbar */}

          {/* Page Content */}
          <div className="container-fluid">
            <Outlet />
          </div>
          {/* End of Page Content */}

        </div>
        {/* End of Main Content */}

        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>&copy; 2025 Admin Dashboard</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}

      </div>
      {/* End of Content Wrapper */}

    </div>
  );
};

export default LayoutAdmin;