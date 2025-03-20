import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import LayoutClient from "./pages/layouts/LayoutClient";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import List from "./pages/product/List";
import Add from "./pages/product/Add";
import LayoutAdmin from "./pages/layouts/LayoutAdmin";
import { Toaster } from "react-hot-toast";
import Edit from "./pages/product/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import OrderList from "./pages/OrderList";
import AdminOrders from "./pages/admin/AdminOrders";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<OrderList />} /> {/* Thêm quản lý đơn hàng */}
          </Route>
          {/* <Route path="/admin" element={<PrivateRoute />}> */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="product" element={<List />} />
            <Route path="product/add" element={<Add />} />
            <Route path="product/edit/:id" element={<Edit />} />
            <Route path="orders" element={<AdminOrders />} /> {/* Thêm quản lý đơn hàng */}
          </Route>
          {/* </Route> */}
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
