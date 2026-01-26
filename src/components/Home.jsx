import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome 👋</h1>
        <p>Your one-stop platform for learning & finance</p>

        <div style={styles.buttons}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/ForgotPassword")}>Forget Password</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    width: "350px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};

export default Home;
