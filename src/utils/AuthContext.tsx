import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { routes } from "~/constants/routes";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser function is not implemented");
  },
  login: () => {
    throw new Error("login function is not implemented");
  },
  logout: () => {
    throw new Error("logout function is not implemented");
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
      void router.push(routes.INTERESTS);
    } else {
      void router.push(routes.LOGIN);
    }
  }, []);

  const login = (userData: User) => {
    if(typeof window !== "undefined")
    { window.localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      void router.push(routes.INTERESTS);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    void router.push(routes.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
