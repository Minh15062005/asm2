import { useEffect, useState } from "react";

interface Order {
  id: number;
  customer?: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }[];
  total: number;
  status: string;
  createdAt: string;
}

function TongTien() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string>("Tất cả");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3000/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const validOrders = data.filter((order: Order) => order.customer);
        setOrders(validOrders.reverse()); // Mới nhất lên đầu
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    filteredStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === filteredStatus);

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };

  return (
    <div className="container mt-4 text-black">
      <h2>📊 Thống kê đơn hàng</h2>

      <div className="mb-3 d-flex align-items-center gap-3">
        <label>🔍 Lọc theo trạng thái:</label>
        <select
          className="form-select w-auto"
          onChange={(e) => setFilteredStatus(e.target.value)}
          value={filteredStatus}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Chưa xử lý">Chưa xử lý</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã hoàn thành">Đã hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>

      <p>
        Tổng số đơn: <strong>{filteredOrders.length}</strong>
      </p>
      <p>
        Doanh thu: <strong>{totalRevenue.toLocaleString()} VNĐ</strong>
      </p>

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Cập nhật trạng thái</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer?.name || "Không có dữ liệu"}</td>
                <td>{order.customer?.phone || "Không có dữ liệu"}</td>
                <td>{order.customer?.address || "Không có dữ liệu"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
                <td>{order.total.toLocaleString()} VNĐ</td>
                <td>
                  <ul className="mb-0">
                    {order.items?.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity} ={" "}
                        {(item.price * item.quantity).toLocaleString()} VNĐ
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TongTien;
