import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-4 text-black">
      <h2>🛒 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống! Hãy thêm sản phẩm.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <span>Tên Sản Phẩm : {item.name}</span>
                <span>Gía : {item.price.toLocaleString()} VNĐ</span>
                <div>
               <span> Số Lượng : </span>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    ➖
                  </button>
                  <span> {item.quantity}</span>
                  <button
                    className="btn btn-sm btn-primary ms-2"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    ➕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4 className="mt-3">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h4>

          <Link to="/checkout" className="btn btn-success mt-3">
            Tiến hành thanh toán
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
