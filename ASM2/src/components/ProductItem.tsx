import { Link, useNavigate } from "react-router-dom";
import IProduct from "../interfaces/product";
import { useCart } from "../context/CartContext"; // Import Context giỏ hàng

function ProductItem(props: IProduct) {
  const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ hàng từ Context
  const navigate = useNavigate(); // Điều hướng trang

  const handleBuyNow = () => {
    addToCart({
      id: props.id,
      name: props.title, // Đổi từ "title" thành "name" để phù hợp với CartItem
      price: props.price,
      thumbnail: props.thumbnail,
      quantity: 1, // Mặc định thêm 1 sản phẩm vào giỏ hàng
    });

    navigate("/cart"); // Chuyển hướng đến trang giỏ hàng
  };

  return (
    <div className="card" style={{ width: "300px" }}>
      {/* Click vào sản phẩm để xem chi tiết */}
      <Link to={`/product/${props.id}`}>
        <img style={{ height: "300px" }} src={props.thumbnail} className="card-img-top" alt={props.title} />
      </Link>
      
      {/* Thông tin sản phẩm */}
      <div className="card-body">
        <h5 className="card-title text-truncate">{props.title}</h5>
        <p className="card-text text-truncate">{props.description}</p>
        <h5 className="text-danger">{props.price.toLocaleString()} VNĐ</h5>
        
        {/* Nút "Mua ngay" */}
        <button className="btn btn-primary" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
