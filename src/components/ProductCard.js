function ProductCard({ name, price, image }) {
  return (
    <div style={styles.card} className="soft-hover">
      {image && <img src={image} alt={name} style={styles.image} className="product-image" />}
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
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    margin: "0 auto",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
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
    padding: "10px 18px",
    backgroundColor: "#25D366",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "20px",
    fontSize: "14px",
  },
};

export default ProductCard;
