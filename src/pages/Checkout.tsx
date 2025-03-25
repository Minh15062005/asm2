import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../interfaces/Caritem";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone: string): boolean => {
    return /^(0[3-9])[0-9]{8}$/.test(phone);
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!validatePhone(customerInfo.phone)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }
    if (!token) {
      alert("Bạn chưa đăng nhập! Hãy đăng nhập trước khi thanh toán.");
      navigate("/login");
      return;
    }

    const orderData = {
      customer: customerInfo,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
      status: "Đang xử lý",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Lỗi khi đặt hàng!");

      alert("🎉 Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mt-4 text-black"> {/* Thêm class text-white để đổi màu phông chữ */}
      <h2>🛍️ Thanh toán</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.</p>
      ) : (
        <div>
          <h4>Thông tin đơn hàng</h4>
          <ul className="list-group">
            {cart.map((item: CartItem) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center ">
                <img src={item.thumbnail} alt={item.name} style={{ width: "50px", height: "50px" }} />
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <span>x{item.quantity || 1}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Thông tin khách hàng</h4>
          <input type="text" name="name" className="form-control mb-2" placeholder="Họ và tên" onChange={handleInputChange} />
          <input type="text" name="phone" className="form-control mb-2" placeholder="Số điện thoại" onChange={handleInputChange} />
          <input type="text" name="address" className="form-control mb-2" placeholder="Địa chỉ nhận hàng" onChange={handleInputChange} />

          <button className="btn btn-success mt-3" onClick={handlePayment}>
            ✅ Xác nhận đơn hàng
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;