import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { message } from "antd";

// Định nghĩa type cho User
type User = {
  id: number;
  email: string;
  role?: string;
};

// Định nghĩa type cho UserContext
type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

// Tạo UserContext để chia sẻ thông tin người dùng
const UserContext = createContext<UserContextType | null>(null);

// Tạo UserProvider để cung cấp thông tin người dùng cho toàn bộ ứng dụng
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Kiểm tra localStorage khi ứng dụng load lần đầu
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Hàm login để lưu thông tin người dùng vào localStorage
  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    message.success("Đăng nhập thành công!");
  };

  // Hàm logout để xóa thông tin người dùng khỏi localStorage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    message.success("Đăng xuất thành công!");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom hook để sử dụng UserContext trong các component khác
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
