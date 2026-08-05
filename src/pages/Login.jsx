import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCapsules, FaUserMd, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Temporary login (until backend is connected)
    const user = {
      name: email.split("@")[0],
      email: email,
      role: "Administrator",
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={styles.left}
      >
        <h1 style={styles.title}>PharmaFlow</h1>

        <p style={styles.subtitle}>
          Smart Pharmacy Order & Inventory Management
        </p>

        <div style={styles.feature}>
          <FaCapsules size={26} />
          <span>Medicine Inventory</span>
        </div>

        <div style={styles.feature}>
          <FaUserMd size={26} />
          <span>Order Management</span>
        </div>

        <div style={styles.feature}>
          <FaShieldAlt size={26} />
          <span>AI Recommendations</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        <h2>Welcome Back 👋</h2>

        <p style={{ color: "#666", marginBottom: 25 }}>
          Login to continue
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#2563eb,#4f46e5)",
  },

  left: {
    flex: 1,
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "80px",
  },

  title: {
    fontSize: "55px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 15,
    marginBottom: 50,
    fontSize: "18px",
    lineHeight: 1.8,
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginBottom: 25,
    fontSize: "18px",
  },

  card: {
    width: 420,
    background: "white",
    margin: "auto",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 15px 40px rgba(0,0,0,.2)",
  },

  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 16,
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 15,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;