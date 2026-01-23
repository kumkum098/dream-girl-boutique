import founderImg from "../assets/team/founder.jpg";
import designerImg from "../assets/team/designer.jpg";
import supportImg from "../assets/team/support.jpg";
import operationsImg from "../assets/team/operations.jpg";

function About() {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Our Story</h2>

      <p style={styles.intro}>
        Dream Girl Boutique is a family-run boutique where fashion is crafted
        with love, tradition, and dedication. Every outfit we stitch carries
        years of experience and a personal touch.
      </p>

      <div style={styles.members}>
        <div style={styles.card}>
          <img src={founderImg} alt="Founder" style={styles.photo} />
          <h4>Founder</h4>
          <p>Master in traditional & bridal stitching</p>
        </div>

        <div style={styles.card}>
          <img src={designerImg} alt="Designer" style={styles.photo} />
          <h4>Designer</h4>
          <p>Specialist in modern & party wear</p>
        </div>

        <div style={styles.card}>
          <img src={supportImg} alt="Support" style={styles.photo} />
          <h4>Support</h4>
          <p>Customer coordination & fittings</p>
        </div>

        <div style={styles.card}>
          <img src={operationsImg} alt="Operations" style={styles.photo} />
          <h4>Operations</h4>
          <p>Quality control & daily operations</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 20px",
    backgroundColor: "#fffafc",
    minHeight: "100vh",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "25px",
    color: "#2c2c2c",
  },
  intro: {
    maxWidth: "700px",
    margin: "0 auto 50px",
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#555",
  },
  members: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: "220px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  photo: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    objectPosition: "top",
    backgroundColor: "#f1e4ea",
    borderRadius: "12px",
    padding: "6px",
    marginBottom: "15px",
  },
};

export default About;
