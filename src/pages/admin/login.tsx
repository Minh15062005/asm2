import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/button";
import toast from "react-hot-toast";

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        try {
            // Gửi request tìm user theo email
            const response = await fetch(`http://localhost:3000/users?email=${username}`);
            const users = await response.json();
    
            if (users.length === 0) {
                throw new Error("Người dùng không tồn tại!");
            }
    
            const user = users[0];
    
            if (user.password !== password) {
                throw new Error("Sai mật khẩu!");
            }
    
            // Đăng nhập thành công
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-96 shadow-lg p-6 bg-white rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tài khoản</label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-1"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full">Đăng nhập</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginAdmin;
