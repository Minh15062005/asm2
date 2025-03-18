import { useEffect, useState } from "react";
import IProduct from "../interfaces/product";
import ProductItem from "../components/ProductItem";

function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products`);
        const data = await res.json();
        
        if (data) {
          // Chỉ lấy 4 sản phẩm đầu tiên làm nổi bật
          setProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    getAllProduct();
  }, []);

  return (
    <>
      <h2 className="text-center text-primary fw-bold my-4">✨ Sản phẩm nổi bật ✨</h2>
      <div className="container">
        <div className="row g-4">
          {products.map((item: IProduct) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-6">
              <div className="card border-0 shadow-sm rounded-3 p-3 h-100">
                <ProductItem {...item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
