import { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API lấy danh sách người dùng khi component được load
  useEffect(() => {
    setLoading(true);
    axios
      .get<User[]>("http://localhost:5000/users") // đảm bảo endpoint đúng theo db.json/server bạn dùng
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải danh sách người dùng:", error);
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 Quản lý Người Dùng</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === "admin" ? "Quản trị viên" : "Người dùng"}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Sửa</button>
                  <button className="btn btn-sm btn-danger">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagementPage;
