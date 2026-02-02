import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../animations.css";

function Header() {
  const { isLoggedIn, ownerName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={styles.header} className="animate-slide-left">
      <div style={styles.headerContent}>
        <h1 style={styles.logo}>Dream Girl Boutique</h1>
        {isLoggedIn && (
          <div style={styles.userSection}>
            <span style={styles.ownerName}>👤 {ownerName}</span>
            <button onClick={handleLogout} style={styles.logoutBtn} className="button-hover">
              ✕
            </button>
          </div>
        )}
      </div>
      {!isLoggedIn && (
        <button 
          onClick={() => navigate("/login")} 
          style={styles.loginBtn}
          className="button-hover"
        >
          Login
        </button>
      )}
    </header>
  );
}

const styles = {
  header: {
    padding: "16px 20px",
    backgroundColor: "#d946a6",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "10px",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    transition: "all 0.3s ease",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "slideInUp 0.6s ease-out",
  },
  ownerName: {
    fontSize: "12px",
    color: "#ffffff",
    animation: "fadeIn 0.8s ease-out",
  },
  loginBtn: {
    backgroundColor: "#ffffff",
    color: "#d946a6",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    animation: "slideInUp 0.6s ease-out",
  },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#ffffff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "50%",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
};

export default Header;
