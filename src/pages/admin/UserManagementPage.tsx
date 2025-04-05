import { useState, useEffect } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho user
interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  // Gọi API lấy danh sách users
  useEffect(() => {
    axios.get<User[]>("http://localhost:5000/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Lỗi tải danh sách người dùng:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 Quản lý Người Dùng</h2>

      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagementPage;
