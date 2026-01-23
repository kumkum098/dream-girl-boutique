import ProductCard from "../components/ProductCard";

function Products() {
  const products = [
    { name: "Bridal Lehenga", price: 8500, image: "/products/a1.jpeg" },
    { name: "Party Wear Gown", price: 4500, image: "/products/a2.jpeg" },
    { name: "Custom Ethnic Suit", price: 6200, image: "/products/a3.jpeg" },
    { name: "Traditional Saree", price: 5200, image: "/products/a4.jpeg" },
    { name: "Designer Dress", price: 7800, image: "/products/a5.jpeg" },
    { name: "Festive Outfit", price: 4800, image: "/products/a6.jpeg" },
    { name: "Bridal Gown", price: 9200, image: "/products/a7.jpeg" },
    { name: "Wedding Lehenga", price: 8800, image: "/products/a8.jpeg" },
    { name: "Party Dress", price: 5500, image: "/products/a9.jpeg" },
    { name: "Ethnic Wear", price: 6500, image: "/products/a10.jpeg" },
    { name: "Casual Outfit", price: 3500, image: "/products/a11.jpeg" },
    { name: "Formal Suit", price: 7200, image: "/products/a12.jpeg" },
    { name: "Traditional Dress", price: 4200, image: "/products/a13.jpeg" },
    { name: "Designer Saree", price: 6800, image: "/products/a14.jpeg" },
    { name: "Embroidered Outfit", price: 7500, image: "/products/a15.jpeg" },
    { name: "Festive Saree", price: 5800, image: "/products/a16.jpeg" },
    { name: "Bridal Suit", price: 8200, image: "/products/a17.jpeg" },
    { name: "Party Wear", price: 4900, image: "/products/a18.jpeg" },
    { name: "Designer Lehenga", price: 9500, image: "/products/a19.jpeg" },
    { name: "Wedding Dress", price: 8900, image: "/products/a20.jpeg" },
    { name: "Ethnic Saree", price: 6200, image: "/products/a21.jpeg" },
    { name: "Casual Wear", price: 3800, image: "/products/a22.jpeg" },
    { name: "Formal Dress", price: 7800, image: "/products/a23.jpeg" },
    { name: "Traditional Gown", price: 5500, image: "/products/a24.jpeg" },
    { name: "Designer Outfit", price: 8500, image: "/products/a25.jpeg" },
    { name: "Festive Wear", price: 6100, image: "/products/a26.jpeg" },
    { name: "Bridal Dress", price: 9100, image: "/products/a27.jpeg" },
    { name: "Wedding Saree", price: 8600, image: "/products/a28.jpeg" },
    { name: "Party Suit", price: 5200, image: "/products/a29.jpeg" },
    { name: "Designer Dress", price: 7600, image: "/products/a30.jpeg" },
    { name: "Ethnic Wear", price: 6400, image: "/products/a31.jpeg" },
    { name: "Formal Outfit", price: 8100, image: "/products/a32.jpeg" },
    { name: "Traditional Saree", price: 5900, image: "/products/a33.jpeg" },
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Our Collection</h2>

      <div style={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 16px",
    backgroundColor: "#fdf6f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#2c2c2c",
  },
  grid: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};


export default Products;
