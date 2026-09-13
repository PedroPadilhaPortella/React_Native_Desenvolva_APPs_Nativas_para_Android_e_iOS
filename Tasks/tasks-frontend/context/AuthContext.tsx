import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import axios from "axios";

type User = { name: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (user: User, token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = "@tasks:user";
const TOKEN_KEY = "@tasks:token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Load stored session when opening the app
  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(TOKEN_KEY),
        ]);

        if (storedUser && storedToken) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // Automatically logout when the token is invalid
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) signOut();
        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Redireciona para /login se não tiver o estado user definido
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    }
  }, [user, loading, segments]);

  const signIn = async (user: User, token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  };

  const signOut = async () => {
    delete axios.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
