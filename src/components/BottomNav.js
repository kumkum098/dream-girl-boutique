import { Link, useLocation } from "react-router-dom";
import "../animations.css";

function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.bottomNav} className="animate-slide-up">
      <Link
        to="/"
        style={{
          ...styles.navItem,
          ...(isActive("/") ? styles.navItemActive : {}),
        }}
        className={`nav-link ${isActive("/") ? "active" : ""}`}
      >
        <span style={styles.icon} className={isActive("/") ? "animate-bounce" : ""}>🏠</span>
        <span style={styles.label}>Home</span>
      </Link>
      <Link
        to="/products"
        style={{
          ...styles.navItem,
          ...(isActive("/products") ? styles.navItemActive : {}),
        }}
        className={`nav-link ${isActive("/products") ? "active" : ""}`}
      >
        <span style={styles.icon} className={isActive("/products") ? "animate-bounce" : ""}>🛍️</span>
        <span style={styles.label}>Shop</span>
      </Link>
      <Link
        to="/about"
        style={{
          ...styles.navItem,
          ...(isActive("/about") ? styles.navItemActive : {}),
        }}
        className={`nav-link ${isActive("/about") ? "active" : ""}`}
      >
        <span style={styles.icon} className={isActive("/about") ? "animate-bounce" : ""}>ℹ️</span>
        <span style={styles.label}>About</span>
      </Link>
      <Link
        to="/customer-details"
        style={{
          ...styles.navItem,
          ...(isActive("/customer-details") ? styles.navItemActive : {}),
        }}
        className={`nav-link ${isActive("/customer-details") ? "active" : ""}`}
      >
        <span style={styles.icon} className={isActive("/customer-details") ? "animate-bounce" : ""}>👤</span>
        <span style={styles.label}>Orders</span>
      </Link>
    </nav>
  );
}

const styles = {
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e0e0e0",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
    height: "70px",
    maxWidth: "480px",
    margin: "0 auto",
    zIndex: 100,
    animation: "slideInUp 0.6s ease-out",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    textDecoration: "none",
    color: "#999",
    flex: 1,
    height: "100%",
    transition: "all 0.3s ease",
    cursor: "pointer",
    animation: "navItemSlide 0.6s ease-out",
  },
  navItemActive: {
    color: "#d946a6",
    borderTop: "3px solid #d946a6",
  },
  icon: {
    fontSize: "24px",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
  label: {
    fontSize: "11px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default BottomNav;
