import { useEffect, useState } from "react";
import { Order } from "../../interfaces/Order"; // Import kiểu dữ liệu Order

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Xác định kiểu dữ liệu

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data: Order[]) => setOrders(data)) // Ép kiểu dữ liệu cho orders
      .catch((error) => console.error("Lỗi khi lấy đơn hàng:", error));
  }, []);

  return (
    <div>
      <h2>📦 Quản lý đơn hàng</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer?.name || "N/A"}</td>
              <td>{order.customer?.phone || "N/A"}</td>
              <td>{order.customer?.address || "N/A"}</td>
              <td>{order.total.toLocaleString()} VNĐ</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
