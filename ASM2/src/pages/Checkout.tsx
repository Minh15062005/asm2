import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    console.log("Đơn hàng đã đặt:", { cart, customerInfo });

    alert("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
    clearCart(); // Xóa giỏ hàng sau khi thanh toán
    navigate("/"); // Quay về trang chủ
  };

  return (
    <div className="container mt-4">
      <h2>🛍️ Thanh toán</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.</p>
      ) : (
        <div>
          <h4>Thông tin đơn hàng</h4>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.thumbnail} alt={item.name} style={{ width: "50px", height: "50px" }} />
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Thông tin khách hàng</h4>
          <input type="text" name="name" className="form-control mb-2" placeholder="Họ và tên" onChange={handleInputChange} />
          <input type="text" name="phone" className="form-control mb-2" placeholder="Số điện thoại" onChange={handleInputChange} />
          <input type="text" name="address" className="form-control mb-2" placeholder="Địa chỉ nhận hàng" onChange={handleInputChange} />

          <button className="btn btn-success mt-3" onClick={handlePayment}>
            Xác nhận đơn hàng
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
