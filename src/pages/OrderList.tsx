import React, { useEffect, useState } from "react";
import { Order } from "../interfaces/Status";

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
          setOrders(data.reverse()); // Đơn hàng mới lên trước
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5 text-black">
      <h2>📦 Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào!</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mt-4 p-3 shadow">
            <h5 className="mb-3">🆔 Mã đơn hàng: {order.id}</h5>
            <p><strong>🗓️ Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>🧑 Tên khách:</strong> {order.customer?.name || "Không có"}</p>
            <p><strong>📞 SĐT:</strong> {order.customer?.phone || "Không có"}</p>
            <p><strong>🏠 Địa chỉ:</strong> {order.customer?.address || "Không có"}</p>
            <p><strong>💰 Tổng tiền:</strong> {order.total?.toLocaleString()} VNĐ</p>
            <p><strong>📌 Trạng thái:</strong> {order.status}</p>

            <h6 className="mt-3">🧾 Chi tiết sản phẩm:</h6>
            <ul className="list-group">
              {order.items?.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <img src={item.thumbnail} alt={item.name} style={{ width: "50px", height: "50px" }} />
                  <span>{item.name}</span>
                  <span>{item.price.toLocaleString()} VNĐ</span>
                  <span>Số lượng: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
