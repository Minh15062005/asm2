import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ Kiểm tra đăng nhập

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart(); // ✅ Thêm chức năng tăng/giảm số lượng
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ✅ Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Bạn cần đăng nhập để thanh toán!"); // ✅ Bắt buộc đăng nhập
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mt-4 text-black">
      <h2>🛒 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống! Hãy thêm sản phẩm.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <span>Tên sản phẩm: {item.name}</span>
                <span>Giá: {item.price.toLocaleString()} VNĐ</span>

                {/* ✅ Chức năng tăng/giảm số lượng */}
                <div>
                  <span>Số lượng: </span>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    ➕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Hiển thị tổng tiền */}
          <h4 className="mt-3">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h4>

          {/* ✅ Nút thanh toán, kiểm tra đăng nhập */}
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Tiến hành thanh toán
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
