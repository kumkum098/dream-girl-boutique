import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, ownerName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.brand}>
          <h2 style={styles.logo}>Dream Girl Boutique</h2>
        </div>

        {/* Desktop Navigation */}
        <nav style={styles.nav} className="desktop-nav">
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>
          <Link to="/about" style={styles.link}>About</Link>
          {isLoggedIn ? (
            <>
              <span style={styles.ownerName}>👤 {ownerName}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={styles.loginLink}>Login</Link>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          style={styles.hamburger}
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
          <span style={styles.hamburgerLine}></span>
        </button>
      </header>

      {/* Mobile Slide-in Menu */}
      <div
        style={{
          ...styles.mobileMenu,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        }}
        className="mobile-menu"
      >
        <button
          style={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <nav style={styles.mobileNav}>
          <Link to="/" style={styles.mobileLink} onClick={handleLinkClick}>
          {isLoggedIn ? (
            <>
              <div style={styles.mobileOwnerName}>👤 {ownerName}</div>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={styles.mobileLink} onClick={handleLinkClick}>
              Login
            </Link>
          )}
            Home
          </Link>
          <Link to="/products" style={styles.mobileLink} onClick={handleLinkClick}>
            Products
          </Link>
          <Link to="/about" style={styles.mobileLink} onClick={handleLinkClick}>
            About
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={styles.overlay}
          onClick={() => setMenuOpen(false)}
          className="menu-overlay"
        ></div>
      )}
    </>
  );
}

const styles = {
  header: {
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  loginLink: {
    textDecoration: "none",
    color: "#ffffff",
    fontWeight: "600",
    backgroundColor: "#d946a6",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  ownerName: {
    color: "#d946a6",
    fontWeight: "600",
    fontSize: "14px",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
  },
  hamburgerLine: {
    width: "24px",
    height: "3px",
    backgroundColor: "#d16ba5",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "70vw",
    maxWidth: "280px",
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
    zIndex: 999,
    transition: "transform 0.3s ease",
    overflowY: "auto",
    paddingTop: "60px",
    display: "flex",
    flexDirection: "column",
  },
  closeBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#d16ba5",
    fontWeight: "bold",
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  mobileLink: {
    padding: "16px 20px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    fontSize: "15px",
    borderBottom: "1px solid #f0f0f0",
    transition: "background-color 0.3s ease",
    display: "block",
  },
  mobileOwnerName: {
    padding: "16px 20px",
    color: "#d946a6",
    fontWeight: "600",
    fontSize: "15px",
    borderBottom: "1px solid #f0f0f0",
  },
  mobileLogoutBtn: {
    padding: "16px 20px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    borderBottom: "1px solid #f0f0f0",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 998,
    transition: "opacity 0.3s ease",
  },
};

export default Header;
