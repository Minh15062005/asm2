import { useEffect, useState } from "react";
import IProduct from "../interfaces/product";
import ProductItem from "../components/ProductItem";

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products`);
        const data = await res.json();

        if (data) {
          setProducts(data); // Lấy toàn bộ sản phẩm
          setFeaturedProducts(data.slice(0, 4)); // Lấy 4 sản phẩm nổi bật
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    getAllProduct();
  }, []);

  return (
    <div className="container mt-4">
      {/* Danh sách sản phẩm */}
      <h1 className="text-center text-primary fw-bold">🛒 Danh sách sản phẩm 🛒</h1>
      <div className="row g-4">
        {products.map((item: IProduct) => (
          <div key={item.id} className="col-lg-3 col-md-4 col-6">
            <ProductItem {...item} />
          </div>
        ))}
      </div>

      {/* Sản phẩm nổi bật */}
      <h2 className="text-center text-danger fw-bold my-5">✨ Sản phẩm nổi bật ✨</h2>
      <div className="row g-4">
        {featuredProducts.map((item: IProduct) => (
          <div key={item.id} className="col-lg-3 col-md-4 col-6">
            <div className="card border-0 shadow-lg rounded-4 p-3 h-100">
              <ProductItem {...item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
