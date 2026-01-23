function Prices() {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Stitching Prices</h2>

      <div style={styles.card}>
        <div style={styles.row}>
          <span>Bridal Lehenga Stitching</span>
          <span>₹8,000 onwards</span>
        </div>

        <div style={styles.row}>
          <span>Party Wear Gown Stitching</span>
          <span>₹4,500 onwards</span>
        </div>

        <div style={styles.row}>
          <span>Custom Ethnic Suit</span>
          <span>₹6,000 onwards</span>
        </div>

        <div style={styles.row}>
          <span>Blouse Stitching</span>
          <span>₹1,200 onwards</span>
        </div>

        <div style={styles.row}>
          <span>Alterations</span>
          <span>₹500 onwards</span>
        </div>
      </div>

      <a
        href="https://wa.me/919876543210?text=Hello%20Dream%20Girl%20Boutique,%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20stitching%20prices."
        target="_blank"
        rel="noreferrer"
        style={styles.button}
      >
        Ask on WhatsApp
      </a>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 20px",
    backgroundColor: "#fdf6f9",
    minHeight: "100vh",
    textAlign: "center",
  },
  title: {
    marginBottom: "40px",
    fontSize: "32px",
    color: "#2c2c2c",
  },
  card: {
    maxWidth: "500px",
    margin: "0 auto 30px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    fontSize: "15px",
  },
  button: {
    display: "inline-block",
    padding: "12px 26px",
    backgroundColor: "#25D366",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "25px",
    fontSize: "15px",
  },
};

export default Prices;
