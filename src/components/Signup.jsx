import { useState } from "react";
import { signup } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");       // reset message
    setIsError(false);

    try {
      await signup(username, password, email);

      setMessage("Signup successful ✅");
      setIsError(false);

      // optional redirect
      // navigate("/login");

    } catch (error) {

      setIsError(true);

      if (error.errorCode === "USER_ALREADY_EXISTS") {
        setMessage(error.message);
      } else {
        setMessage("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{ marginLeft: "10px" }}
        >
          Back to Login
        </button>
      </form>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signup;
