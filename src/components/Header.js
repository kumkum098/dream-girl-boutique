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
    <header style={styles.header} className="animate-slide-left site-header">
      <div style={styles.headerContent}>
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}>
            <img src="/logo.jpg" alt="logo" style={styles.logoImage} />
          </div>
          <h1 style={styles.logoText}>Dream Girl Boutique</h1>
        </div>
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
    background: "linear-gradient(180deg, #d946a6, #c1388a)",
    color: "#ffffff",
    boxShadow: "0 8px 24px rgba(209,107,165,0.16)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
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
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
    letterSpacing: "-0.3px",
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  logoText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.3px',
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "slideInUp 0.6s ease-out",
  },
  ownerName: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.9)",
    animation: "fadeIn 0.8s ease-out",
    fontWeight: "500",
  },
  loginBtn: {
    backgroundColor: "#ffffff",
    color: "#d946a6",
    border: "none",
    padding: "8px 18px",
    borderRadius: "18px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
    animation: "slideInUp 0.6s ease-out",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
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
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
};

export default Header;
