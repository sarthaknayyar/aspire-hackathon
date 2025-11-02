import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const useAutoLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
      navigate("/login");
      return;
    }

    const checkExpiry = () => {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        console.warn("JWT expired");
        logout();
        navigate("/login");
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 60 * 1000);
    return () => clearInterval(interval);
  }, [logout, navigate]);
};

export default useAutoLogout;