import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu
type OrderItem = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
};

type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
};

type Order = {
  cart: OrderItem[];
  customerInfo: CustomerInfo;
};

function OrderStatus() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null); // Định nghĩa kiểu dữ liệu

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>📦 Trạng thái đơn hàng</h2>
      {order ? (
        <div>
          <h4>Thông tin đơn hàng</h4>
          <ul className="list-group">
            {order.cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.thumbnail} alt={item.name} style={{ width: "50px", height: "50px" }} />
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Thông tin khách hàng</h4>
          <p><strong>Họ và tên:</strong> {order.customerInfo.name}</p>
          <p><strong>Số điện thoại:</strong> {order.customerInfo.phone}</p>
          <p><strong>Địa chỉ:</strong> {order.customerInfo.address}</p>
          <p className="text-success"><strong>Trạng thái:</strong> Đang xử lý</p>

          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Quay về trang chủ
          </button>
        </div>
      ) : (
        <p>Không có đơn hàng nào gần đây.</p>
      )}
    </div>
  );
}

export default OrderStatus;