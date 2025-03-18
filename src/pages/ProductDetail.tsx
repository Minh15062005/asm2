import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import IProduct from "../interfaces/product";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!id) return;

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
    if (!product) return;

    try {
      addToCart({
        id: product.id,
        name: product.title, 
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1, 
      });

      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  if (loading) return <p className="text-center text-warning">Đang tải...</p>;

  if (!product) return <p className="text-center text-danger">Sản phẩm không tồn tại!</p>;

  return (
    <div className="container mt-5 text-warning"> {/* Áp dụng màu vàng cho toàn bộ */}
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="img-fluid rounded shadow-sm" 
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.title}</h2>
          <p className="text-white">Danh mục: <strong className="text-white">{product.category}</strong></p>
          <h4 className="text-danger fw-bold">{product.price.toLocaleString()} VNĐ</h4>
          <p className="fw-light">{product.description}</p>
          <p>
            <strong>Còn lại:</strong> 
            <span className="text-success"> {product.stock} sản phẩm</span>
          </p>

          {/* Nút Thêm vào giỏ hàng */}
          <button className="btn btn-primary px-4 py-2" onClick={handleAddToCart}>
            🛒 Thêm vào giỏ hàng
          </button>

          {/* Hiệu ứng thông báo khi thêm vào giỏ hàng */}
          {addedToCart && (
            <div className="alert alert-success mt-2" role="alert">
              ✔ Sản phẩm đã được thêm vào giỏ hàng!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
