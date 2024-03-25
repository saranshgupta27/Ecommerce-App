import React, { createContext, useContext, useEffect, useState } from "react";
import { routes } from "~/constants/routes";

export interface User {
  id: number;
  name: string;
  email: string;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = routes.LOGIN;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
