import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import Context giỏ hàng
import IProduct from "../interfaces/product";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ hàng
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState(false); // Trạng thái thông báo

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm!");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.title, 
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1, 
      });

      setAddedToCart(true); // Hiển thị thông báo đã thêm vào giỏ hàng

      setTimeout(() => {
        setAddedToCart(false); // Ẩn thông báo sau 2 giây
      }, 2000);
    }
  };

  if (loading) return <p className="text-center">Đang tải...</p>;

  if (!product) return <p className="text-center text-danger">Sản phẩm không tồn tại!</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          <img src={product.thumbnail} alt={product.title} className="img-fluid rounded shadow-sm" />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2 className="text-primary">{product.title}</h2>
          <p className="text-muted">Danh mục: {product.category}</p>
          <h4 className="text-danger fw-bold">{product.price.toLocaleString()} VNĐ</h4>
          <p className="fw-light">{product.description}</p>
          <p><strong>Còn lại:</strong> {product.stock} sản phẩm</p>

          {/* Nút Thêm vào giỏ hàng */}
          <button className="btn btn-success px-4 py-2" onClick={handleAddToCart}>
            🛒 Thêm vào giỏ hàng
          </button>

          {/* Thông báo khi thêm thành công */}
          {addedToCart && (
            <p className="text-success mt-2">✔ Sản phẩm đã được thêm vào giỏ hàng!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
