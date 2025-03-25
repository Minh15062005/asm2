import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://localhost:3000/users?email=${username}`);
            const users = await response.json();

            if (users.length === 0) {
                throw new Error("Người dùng không tồn tại!");
            }

            const user = users[0];

            if (user.password !== password) {
                throw new Error("Sai mật khẩu!");
            }

            localStorage.setItem("token", "fake-jwt-token");
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Đăng nhập thành công!");

            if (user.role === "admin") {
                navigate("/admin/product");
            } else {
                navigate("/product");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Lỗi không xác định");
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg')" }}>
                <div className="wrap-login100 p-t-30 p-b-50">
                    <span className="login100-form-title p-b-41">Account Login</span>
                    <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={handleLogin}>
                        {error && <div className="alert alert-danger text-center">{error}</div>}

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="text"
                                name="username"
                                placeholder="User name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="focus-input100" data-placeholder="&#xe82a;"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="password"
                                name="pass"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-32">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;