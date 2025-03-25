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

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      })
      .catch((error) => console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error));
  };

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
              <th>Thao tác</th>
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
                <td>
                 <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;