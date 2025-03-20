import { useEffect, useState } from "react";
import { Order } from "../../interfaces/Order"; // Import kiểu dữ liệu Order

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Xác định kiểu dữ liệu

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data: Order[]) => {
        console.log("Dữ liệu đơn hàng:", data); // Debug dữ liệu API
        setOrders(data);
      })
      .catch((error) => console.error("Lỗi khi lấy đơn hàng:", error));
  }, []);

  return (
    <div>
      <h2>📦 Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
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
                <td>{order.id || "N/A"}</td>
                <td>{order.customer?.name || "N/A"}</td>
                <td>{order.customer?.phone || "N/A"}</td>
                <td>{order.customer?.address || "N/A"}</td>
                <td>{order.total ? order.total.toLocaleString() : "0"} VNĐ</td>
                <td>{order.status || "Chưa cập nhật"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
