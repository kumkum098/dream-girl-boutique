function ProductCard({ name, price, image, isUploaded }) {
  return (
    <div style={styles.card} className="soft-hover">
      {image && <img src={image} alt={name} style={styles.image} className="product-image" />}
      {isUploaded && <div style={styles.badge}>New</div>}
      <p style={styles.ready}>Boutique Ready</p>

      <a
        href="https://wa.me/916260859941?text=Hello%20Dream%20Girl%20Boutique,%0A%0AI%20am%20interested%20in%20this%20product.%0A%0APlease%20share%20details."
        target="_blank"
        rel="noreferrer"
        style={styles.button}
      >
        Order on WhatsApp
      </a>
    </div>
  );
}

const styles = {
  card: {
    width: "260px",
    padding: "18px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    boxShadow: "0 12px 28px rgba(17,17,17,0.06)",
    transition: "transform 0.28s cubic-bezier(.2,.9,.2,1), box-shadow 0.28s ease",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "16px",
    transition: "transform 0.28s ease",
  },
  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "linear-gradient(135deg, #ff7eb3, #d16ba5)",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "18px",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(209,107,165,0.2)",
    letterSpacing: "0.3px",
  },
  price: {
    fontWeight: "600",
    marginBottom: "15px",
  },
  ready: {
    fontSize: "14px",
    color: "#d16ba5",
    fontWeight: "600",
    marginBottom: "8px",
    margin: "10px 0 8px 0",
  },
  button: {
    display: "inline-block",
    padding: "11px 20px",
    background: "linear-gradient(135deg, #25D366, #20b856)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "18px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
    boxShadow: "0 6px 16px rgba(37,211,102,0.18)",
    border: "none",
  },
};

export default ProductCard;
