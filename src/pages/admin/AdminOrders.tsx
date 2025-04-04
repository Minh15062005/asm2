import { useEffect, useState } from "react";
import { Order } from "../../interfaces/Order";

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data: Order[]) => setOrders(data))
      .catch((error) => console.error("Lỗi khi lấy đơn hàng:", error));
  }, []);

  const toggleOrderSelection = (orderId: number) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const updateMultipleOrders = (newStatus: string) => {
    selectedOrders.forEach((orderId) => {
      updateOrderStatus(orderId, newStatus);
    });
    setSelectedOrders([]);
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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

  const filteredOrders = orders.filter((order) =>
    (order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone.includes(searchTerm) ||
      order.id.toString().includes(searchTerm)) &&
    (filterStatus ? order.status === filterStatus : true)
  );

  return (
    <div>
      <h2>📦 Quản lý đơn hàng</h2>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên, số điện thoại, ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="">Tất cả trạng thái</option>
        <option value="Chưa xử lý">Chưa xử lý</option>
        <option value="Đang xử lý">Đang xử lý</option>
        <option value="Đã hoàn thành">Đã hoàn thành</option>
        <option value="Đã hủy">Đã hủy</option>
      </select>

      <button
        onClick={() => updateMultipleOrders("Đã hoàn thành")}
        disabled={!selectedOrders.length}
      >
        ✅ Hoàn tất đơn hàng đã chọn
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Chọn</th>
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
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                />
              </td>
              <td>{order.id}</td>
              <td>{order.customer?.name || "N/A"}</td>
              <td>{order.customer?.phone || "N/A"}</td>
              <td>{order.customer?.address || "N/A"}</td>
              <td>{order.total ? order.total.toLocaleString() : "0"} VNĐ</td>
              <td>{order.status || "Chưa cập nhật"}</td>
              <td>
                <button onClick={() => setOrderDetail(order)}>👁 Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderDetail && (
        <div className="modal">
          <h3>🧾 Chi tiết đơn hàng #{orderDetail.id}</h3>
          <p><strong>Khách hàng:</strong> {orderDetail.customer?.name}</p>
          <p><strong>Địa chỉ:</strong> {orderDetail.customer?.address}</p>
          <p><strong>Tổng tiền:</strong> {orderDetail.total?.toLocaleString()} VNĐ</p>
          <p><strong>Trạng thái hiện tại:</strong> {orderDetail.status}</p>

          <h4>📜 Lịch sử trạng thái:</h4>
          {orderDetail.history && orderDetail.history.length > 0 ? (
            <ul>
              {orderDetail.history.map((item, index) => (
                <li key={index}>
                  ✅ <strong>{item.status}</strong> -{" "}
                  {new Date(item.updatedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có lịch sử trạng thái.</p>
          )}

          <button onClick={() => setOrderDetail(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
