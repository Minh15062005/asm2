import { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu người dùng
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface UserContextType {
  users: User[];
  updateUserRole: (id: string, role: "user" | "admin") => void;
  removeUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Nguyễn Văn A", email: "a@example.com", role: "user" },
    { id: "2", name: "Trần Thị B", email: "b@example.com", role: "admin" },
  ]);

  // Cập nhật vai trò người dùng
  const updateUserRole = (id: string, role: "user" | "admin") => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  // Xóa người dùng
  const removeUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, updateUserRole, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
