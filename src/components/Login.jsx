import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService";

export default function Login() {
  const [username, setUsername] = useState("");   // 1
  const [password, setPassword] = useState("");   // 2
  const [loading, setLoading] = useState(false);  // 3
  const [error, setError] = useState(null);       // 4
  const navigate = useNavigate();                 // 5

  const handleSubmit = async (e) => {
    e.preventDefault();    
    console.log("Username entered:", username);
    console.log("Password entered:", password);
    setLoading(true);                             // 7
    setError(null);                               // 8
    try {
      const data = await login(username, password); // 9
      // optional: data may include user info, token saved in AuthService
      navigate("/dashboard");                     // 10
    } catch (err) {
      console.error(err);                         // 11
      // handle axios error shape: err.response?.data or message
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);                          // 12
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>              {/* 13 */}
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 14
            placeholder="username"
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 15
            placeholder="password"
          />
        </div>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>} {/* 16 */}

        <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Logging in..." : "Login"}      {/* 17 */}
        </button>
      </form>
    </div>
  );
}
