import React from "react";
import { useUser } from "../context/UserContext"; // Đảm bảo đúng đường dẫn

const UserProfile = () => {
  const { user, login, logout } = useUser();

  return (
    <div>
      {user ? (
        <div>
          <h2>Chào mừng, {user.email}!</h2>
          <button onClick={logout}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <h2>Vui lòng đăng nhập</h2>
          <button
            onClick={() =>
              login({ id: 1, email: "user@example.com", role: "admin" })
            }
          >
            Đăng nhập
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
