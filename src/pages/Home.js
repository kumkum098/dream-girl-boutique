import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShopStatusContext } from "../context/ShopStatusContext";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const { isOpen } = useContext(ShopStatusContext);
  const navigate = useNavigate();
  return (
    <div className="page-container" style={styles.page}>
      {/* Shop Status Banner */}
      <div style={{
        ...styles.statusBanner,
        backgroundColor: isOpen ? '#d4edda' : '#f8d7da',
        borderColor: isOpen ? '#c3e6cb' : '#f5c6cb',
      }}>
        <span style={{
          ...styles.statusIcon,
          color: isOpen ? '#155724' : '#721c24',
        }}>
          {isOpen ? '✅' : '🔒'}
        </span>
        <span style={{
          color: isOpen ? '#155724' : '#721c24',
          fontWeight: '600',
        }}>
          {isOpen ? 'Shop is OPEN' : 'Shop is CLOSED'}
        </span>
      </div>

      <section className="home-hero" style={styles.hero}>
        <div className="hero-content" style={styles.heroContent}>
          <div style={styles.logoContainer}>
            <img
              className="hero-logo"
              src="/logo.jpg"
              alt="Dream Girl Boutique Logo"
              style={styles.heroLogo}
            />
          </div>

          <h1 className="hero-title" style={styles.heroTitle}>Dream Girl Boutique</h1>

          <p style={styles.heroSubtitle}>
            Handcrafted outfits stitched with love, tradition & elegance
          </p>

          <div style={styles.heroButtons}>
            <a href="/products" style={styles.primaryBtn} className="button-hover">
              ✨ View Collection
            </a>
            {isLoggedIn && (
              <button
                onClick={() => navigate("/customer-details")}
                style={styles.secondaryBtn}
                className="button-hover"
              >
                📋 Customer Details
              </button>
            )}
          </div>

          <div style={styles.socialSection}>
            <a
              href="https://www.instagram.com/dreamgirl.boutique1"
              target="_blank"
              rel="noreferrer"
              style={styles.instagramLink}
              title="Follow us on Instagram"
            >
              <span style={styles.instagramIcon}>📷</span>
              <span style={styles.instagramText}>dreamgirl.boutique1</span>
            </a>

            <div style={styles.phoneSection}>
              <a href="tel:9926054486" style={styles.phoneLink}>
                <span style={styles.phoneIcon}>☎️</span>
                <span>9926054486</span>
              </a>
              <a href="tel:6260859941" style={styles.phoneLink}>
                <span style={styles.phoneIcon}>☎️</span>
                <span>6260859941</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location QR Code Section */}
      <section className="qr-section" style={styles.qrSection}>
        <div style={styles.qrContainer}>
          <h2 style={styles.qrTitle}>Visit Our Boutique</h2>
          <p style={styles.qrSubtitle}>Scan to find our location</p>
          
          <div style={styles.qrWrapper}>
            <img
              className="qr-image"
              src="/qr-location.jpg"
              alt="Location QR Code - Dream Girl Boutique"
              style={styles.qrImage}
            />
          </div>

          <p style={styles.qrHint}>📍 Tap the image to open location</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    color: "#222",
    background: "linear-gradient(180deg, #fff 0%, #fbf7fb 100%)",
    minHeight: "100vh",
  },

  statusBanner: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: "1px solid",
    animation: "slideInUp 0.5s ease-out",
    fontWeight: "500",
  },

  statusIcon: {
    fontSize: "18px",
    display: "inline-block",
  },

  hero: {
    minHeight: "60vh",
    background: "linear-gradient(135deg, rgba(255,126,179,0.08) 0%, rgba(209,107,165,0.08) 50%, rgba(255,230,239,0.12) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  },

  heroContent: {
    textAlign: "center",
    maxWidth: "500px",
    animation: "slideInUp 0.8s cubic-bezier(.2,.9,.2,1)",
  },

  logoContainer: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
  },

  heroLogo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    boxShadow: "0 20px 50px rgba(209,107,165,0.15)",
    objectFit: "cover",
    transition: "transform 0.4s cubic-bezier(.2,.9,.2,1), box-shadow 0.4s ease",
  },

  heroTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c2c2c",
    margin: "20px 0 12px 0",
    lineHeight: "1.2",
    letterSpacing: "-0.5px",
  },

  heroSubtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 36px 0",
    lineHeight: "1.6",
    fontWeight: "400",
  },

  heroButtons: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },

  primaryBtn: {
    padding: "14px 32px",
    background: "linear-gradient(180deg, #ff7eb3, #d16ba5)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "15px",
    boxShadow: "0 12px 30px rgba(209,107,165,0.2)",
    transition: "all 0.3s cubic-bezier(.2,.9,.2,1)",
    display: "inline-block",
  },

  secondaryBtn: {
    padding: "14px 32px",
    background: "linear-gradient(180deg, rgba(255,126,179,0.15), rgba(209,107,165,0.1))",
    color: "#d16ba5",
    border: "1.5px solid #d16ba5",
    textDecoration: "none",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s cubic-bezier(.2,.9,.2,1)",
    cursor: "pointer",
    display: "inline-block",
  },

  socialSection: {
    marginTop: "40px",
    paddingTop: "40px",
    borderTop: "1px solid rgba(209,107,165,0.1)",
  },

  instagramLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #a0467f, #d16ba5)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "25px",
    transition: "all 0.3s cubic-bezier(.2,.9,.2,1)",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 8px 25px rgba(160,70,127,0.2)",
    marginBottom: "20px",
  },

  instagramIcon: {
    fontSize: "18px",
    transition: "transform 0.3s ease",
    display: "inline-block",
  },

  instagramText: {
    fontSize: "14px",
    fontWeight: "600",
  },

  phoneSection: {
    marginTop: "18px",
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  phoneLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 18px",
    background: "linear-gradient(135deg, rgba(209,107,165,0.9), rgba(160,70,127,0.9))",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "22px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(.2,.9,.2,1)",
    boxShadow: "0 6px 20px rgba(160,70,127,0.15)",
  },

  phoneIcon: {
    fontSize: "16px",
    transition: "transform 0.3s ease",
    display: "inline-block",
  },

  /* Location QR Code Section */
  qrSection: {
    background: "linear-gradient(135deg, rgba(209,107,165,0.06) 0%, rgba(255,126,179,0.04) 100%)",
    padding: "36px 16px",
    minHeight: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  qrContainer: {
    textAlign: "center",
    maxWidth: "420px",
    animation: "slideInUp 0.8s cubic-bezier(.2,.9,.2,1) 0.2s both",
  },

  qrTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c2c2c",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },

  qrSubtitle: {
    fontSize: "15px",
    color: "#666",
    margin: "0 0 30px 0",
    fontWeight: "400",
  },

  qrWrapper: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 16px 40px rgba(17,17,17,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
    transition: "all 0.3s cubic-bezier(.2,.9,.2,1)",
  },

  qrImage: {
    width: "220px",
    height: "220px",
    objectFit: "contain",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  qrHint: {
    fontSize: "13px",
    color: "#999",
    margin: "0",
    fontWeight: "500",
  },
};

export default Home;