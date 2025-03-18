import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart } = useCart();

  return (
    <div className="container mt-4">
      <h2>🛒 Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống! Hãy thêm sản phẩm.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.thumbnail} alt={item.name} style={{ width: "50px", height: "50px" }} />
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>

          <Link to="/checkout" className="btn btn-success mt-3">Tiến hành thanh toán</Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
