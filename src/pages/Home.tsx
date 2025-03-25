import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import AuthContext
import { useCart } from "../context/CartContext";  // Import CartContext
import IProduct from "../interfaces/product";
import './layouts/css/styles.css';

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get user information from AuthContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        if (data) {
          setProducts(data);
          setFeaturedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle "Buy Now" button click
  const handleBuyNow = (product: IProduct) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    navigate("/cart"); // Redirect to cart page
  };

  return (

    <div>
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">Welcome To Our Studio!</div>
          <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
          <Link className="btn btn-primary btn-xl text-uppercase" to="#services">Tell Me More</Link>
        </div>
        <section className="text-center my-4">
        {user ? (
          <h2 className="text-success">Xin chào, <strong>{user.name}</strong>! Chào mừng bạn quay trở lại. 🎉</h2>
        ) : (
          <h2 className="text-warning">
            Vui lòng <Link to="/login">đăng nhập</Link> để trải nghiệm mua sắm tốt nhất!
          </h2>
        )}
      </section>
      </header>

      {/* Navigation */}
      <section className="page-section" id="services">
  <div className="container">
    <div className="text-center">
      <h2 className="section-heading text-uppercase">Dịch vụ</h2>
      <h3 className="section-subheading text-muted">Các giải pháp công nghệ hàng đầu của chúng tôi.</h3>
    </div>
    <div className="row text-center">
      <div className="col-md-4">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFm-aSgSMEzAXrdf9horLstHHtihCOq3HpA&s" alt="Thương mại điện tử" className="mb-3" width="100" />
        <h4 className="my-3">Thương mại điện tử</h4>
        <p className="text-muted">Chúng tôi cung cấp giải pháp bán hàng trực tuyến chuyên nghiệp.</p>
      </div>
      <div className="col-md-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png" alt="Thiết kế đáp ứng" className="mb-3" width="100" />
        <h4 className="my-3">Thiết kế đáp ứng</h4>
        <p className="text-muted">Giao diện web hiển thị hoàn hảo trên mọi thiết bị.</p>
      </div>
      <div className="col-md-4">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6WsCGy-o3brXcj2cmXGkHM_fE_p0gy4X8w&s" alt="Bảo mật web" className="mb-3" width="100" />
        <h4 className="my-3">Bảo mật web</h4>
        <p className="text-muted">Giải pháp bảo mật giúp bảo vệ website khỏi các mối đe dọa.</p>
      </div>
    </div>
  </div>
</section>


      {/* <nav className="navbar navbar-expand-lg navbar-dark py-lg-4">
        <div className="container">
          <Link className="navbar-brand text-uppercase fw-bold" to="/">Cửa hàng sản phẩm</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Trang chủ</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Sản phẩm</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Liên hệ</Link></li>
            </ul>
            <div className="d-flex align-items-center">
              {user ? (
                <span className="text-light me-3">👋 Xin chào, {user.name}</span>
              ) : (
                <span className="text-light me-3">👋 Xin chào</span>
              )}
            </div>
          </div>
        </div>
      </nav> */}

      {/* Welcome message */}
    

      {/* Product list */}
      <section className="page-section">
        <div className="container">
          <h2 className="text-center text-primary mb-4">Danh sách sản phẩm</h2>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-6">
                <div className="card border-0 shadow-lg rounded-4 p-3 h-100">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price.toLocaleString()} VND</p>
                    <button className="btn btn-success w-100" onClick={() => handleBuyNow(product)}>
                      🛒 Mua hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="page-section bg-light">
        <div className="container">
          <h2 className="text-center text-danger mb-4">✨ Sản phẩm nổi bật ✨</h2>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-6">
                <div className="card border-0 shadow-lg rounded-4 p-3 h-100">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price.toLocaleString()} VND</p>
                    <button className="btn btn-warning w-100" onClick={() => handleBuyNow(product)}>
                      🛒 Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
    <section className="page-section" id="about">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Giới thiệu</h2>
          <h3 className="section-subheading text-muted">
            Lorem ipsum dolor sit amet consectetur.
          </h3>
        </div>
        <ul className="timeline">
          <li>
            <div className="timeline-image">
              <img
                className="rounded-circle img-fluid"
                src="https://scontent.fsgn14-1.fna.fbcdn.net/v/t39.30808-6/484793765_641720988458010_1550665057784103723_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=o3y01KghmE4Q7kNvgGL4vkY&_nc_oc=AdnEYvjXj4aG4wmD3a7FPAZHM2L8xVG_N9MQBwujNP7JJshb4X864QlbWqFYd05RHYM&_nc_zt=23&_nc_ht=scontent.fsgn14-1.fna&_nc_gid=VXX4fRJBhpJgFz-JSjI7_Q&oh=00_AYGdczx2sFAiaJo_2impTeMFW1x_bDT9Qd2bvpKnpTH0YA&oe=67E7EA2E"
                alt="Humble Beginnings"
              />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>2009-2011</h4>
                <h4 className="subheading">Our Humble Beginnings</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sunt ut voluptatum eius sapiente, totam reiciendis temporibus
                  qui quibusdam, recusandae sit vero unde, sed, incidunt et ea
                  quo dolore laudantium consectetur!
                </p>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-image">
              <img
                className="rounded-circle img-fluid"
                src="https://scontent.fsgn14-1.fna.fbcdn.net/v/t51.75761-15/485655924_18061276499503970_11117918797572325_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=X5gJ3mfjt7kQ7kNvgH2dJYd&_nc_oc=AdnpB44di42aPy8HddjTaNA7XNYxY6xzt_jkYtAmJquPqYfKI8MTcVbZXZyTQIan0gs&_nc_zt=23&_nc_ht=scontent.fsgn14-1.fna&_nc_gid=zSz-xiag-dtKs3HnTwbd7Q&oh=00_AYEIn6jS5uiYEWHrxvjqHCsxXFdaUO5xHeTLt1DCC7WeJw&oe=67E7E0A7"
                alt="An Agency is Born"
              />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>March 2011</h4>
                <h4 className="subheading">An Agency is Born</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sunt ut voluptatum eius sapiente, totam reiciendis temporibus
                  qui quibusdam, recusandae sit vero unde, sed, incidunt et ea
                  quo dolore laudantium consectetur!
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>


      {/* Team */}
      <section className="page-section bg-light" id="team">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Đội ngũ tuyệt vời của chúng tôi</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
          <div className="row">
            {/* Team members here */}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Liên hệ với chúng tôi</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
          <form id="contactForm" data-sb-form-api-token="API_TOKEN">
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control" id="name" type="text" placeholder="Tên của bạn *" data-sb-validations="required" />
                  <div className="invalid-feedback" data-sb-feedback="name:required">Cần có tên.</div>
                </div>
                <div className="form-group">
                  <input className="form-control" id="email" type="email" placeholder="Email của bạn *" data-sb-validations="required,email" />
                  <div className="invalid-feedback" data-sb-feedback="email:required">Cần có email.</div>
                  <div className="invalid-feedback" data-sb-feedback="email:email">Email không hợp lệ.</div>
                </div>
                <div className="form-group mb-md-0">
                  <input className="form-control" id="phone" type="tel" placeholder="Số điện thoại của bạn *" data-sb-validations="required" />
                  <div className="invalid-feedback" data-sb-feedback="phone:required">Cần có số điện thoại.</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-textarea mb-md-0">
                  <textarea className="form-control" id="message" placeholder="Tin nhắn của bạn *" data-sb-validations="required" />
                  <div className="invalid-feedback" data-sb-feedback="message:required">Cần có tin nhắn.</div>
                </div>
              </div>
            </div>
            <div className="d-none" id="submitSuccessMessage">
              <div className="text-center text-white mb-3">
                <div className="fw-bolder">Gửi mẫu thành công!</div>
                Để kích hoạt mẫu này, hãy đăng ký tại <br />
                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
              </div>
            </div>
            <div className="d-none" id="submitErrorMessage">
              <div className="text-center text-danger mb-3">Lỗi khi gửi tin nhắn!</div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Gửi tin nhắn</button>
            </div>
          </form>
        </div>
      </section>
      
    </div>
  );
}

export default Home;