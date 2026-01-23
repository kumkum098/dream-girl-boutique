import React from "react";

function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <img
            src="/logo.jpg"
            alt="Dream Girl Boutique Logo"
            style={styles.heroLogo}
          />

          <h1 style={styles.heroTitle}>Dream Girl Boutique</h1>

          <p style={styles.heroSubtitle}>
            Handcrafted outfits stitched with love, tradition & elegance
          </p>

          <div style={styles.heroButtons}>
            <a href="/products" style={styles.primaryBtn}>
              View Collection
            </a>
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
                <span style={styles.phoneIcon}>📞</span>
                <span>9926054486</span>
              </a>
              <a href="tel:6260859941" style={styles.phoneLink}>
                <span style={styles.phoneIcon}>📞</span>
                <span>6260859941</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "sans-serif",
    color: "#2c2c2c",
  },

  hero: {
    minHeight: "85vh",
    background: "linear-gradient(135deg, #fbe4ec, #fdf6f9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heroContent: {
    textAlign: "center",
  },

  heroLogo: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
  },

  heroTitle: {
    fontSize: "48px",
  },

  heroSubtitle: {
    fontSize: "18px",
  },

  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },

  primaryBtn: {
    padding: "14px 30px",
    backgroundColor: "#d16ba5",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "30px",
  },

  secondaryBtn: {
    padding: "14px 30px",
    border: "1px solid #d16ba5",
    color: "#d16ba5",
    textDecoration: "none",
    borderRadius: "30px",
  },

  socialSection: {
    marginTop: "30px",
  },

  instagramLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    backgroundColor: "#a0467f",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "25px",
    transition: "all 0.3s ease",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(160, 70, 127, 0.3)",
  },

  instagramIcon: {
    fontSize: "20px",
    transition: "transform 0.3s ease",
  },

  instagramText: {
    fontSize: "14px",
  },

  phoneSection: {
    marginTop: "15px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  phoneLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    backgroundColor: "#a0467f",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(160, 70, 127, 0.3)",
  },

  phoneIcon: {
    fontSize: "18px",
    transition: "transform 0.3s ease",
  },
};

export default Home;