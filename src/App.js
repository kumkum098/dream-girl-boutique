import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerDetails from "./pages/CustomerDetails";
import { AuthProvider } from "./context/AuthContext";
import { ImageProvider } from "./context/ImageContext";
import { OrderProvider } from "./context/OrderContext";
import { ShopStatusProvider } from "./context/ShopStatusContext";
import InstallButton from "./components/InstallButton";

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <OrderProvider>
          <ShopStatusProvider>
            <div style={styles.appContainer}>
            <Header />
          <div style={styles.contentContainer}>
            <InstallButton />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customer-details" element={<CustomerDetails />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
        </ShopStatusProvider>
        </OrderProvider>
      </ImageProvider>
    </AuthProvider>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    maxWidth: "1200px",
    margin: "0 auto",
    boxShadow: "none",
  },
  contentContainer: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: "70px",
  },
};

export default App;
