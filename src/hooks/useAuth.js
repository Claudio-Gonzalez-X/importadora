import { useAuth } from "../context/AuthContext";

export default function useAuthState() {
  const { user, role, loading } = useAuth();
  return { user, role, loading };
}
