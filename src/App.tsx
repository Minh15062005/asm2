
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext"; // Thêm vào đây

// Layouts
import LayoutClient from "./pages/layouts/LayoutClient";
import LayoutAdmin from "./pages/layouts/LayoutAdmin";

// Pages (Client)
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderList from "./pages/OrderList";

// Pages (Admin)
import List from "./pages/product/List";
import Add from "./pages/product/Add";
import Edit from "./pages/product/Edit";
import AdminOrders from "./pages/admin/AdminOrders";
import HomeAdmin from "./pages/product/home";
import LoginAdmin from "./pages/admin/login";

// Optional: Component sử dụng UserContext (chỉ test hiển thị)
import UserProfile from "./components/UserProfile"; // Thêm nếu bạn cần dùng thử

// 🔐 Bảo vệ trang Admin
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/loginadmin" replace />;
  }
  return children;
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <UserProvider> {/* ✅ Bọc UserProvider ở đây */}
          <CartProvider>
            <Routes>
              {/* 🚀 Layout khách hàng */}
              <Route path="/" element={<LayoutClient />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="orders" element={<OrderList />} />
              </Route>

              {/* 🚀 Admin */}
              <Route path="/admin/loginadmin" element={<LoginAdmin />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <LayoutAdmin />
                  </PrivateRoute>
                }
              >
                <Route path="home" element={<HomeAdmin />} />
                <Route path="product" element={<List />} />
                <Route path="product/add" element={<Add />} />
                <Route path="product/edit/:id" element={<Edit />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>

              {/* 👤 Optional: Trang hiển thị UserProfile nếu cần */}
              <Route path="/profile" element={<UserProfile />} />

              {/* 🚀 Trang không tồn tại */}
              <Route path="*" element={<h1>404 - Not Found</h1>} />
            </Routes>
            <Toaster />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
