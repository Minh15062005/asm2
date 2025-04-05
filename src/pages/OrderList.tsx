import React, { useEffect, useState } from "react";
import { Order } from "../interfaces/Status"; // Import interface Order

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("http://localhost:3000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data: Order[] = await response.json();
          setOrders(data);
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="mt-5 text-black">📦 Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào!</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Số lượng mặt hàng</th>
              <th>Tổng giá trị đơn hàng</th>
              <th>Tình trạng đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.items ? order.items.length : 0}</td>
                <td>{order.total?.toLocaleString() || "0"} VNĐ</td>
                <td>{order.status || "Chưa cập nhật"}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default OrderList;
