import { use, useState } from "react";
import { signup } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";



function Signup() {
  // 1️⃣ State to store form values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  // 2️⃣ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    //debugger;
    try {
      await signup(username, password);
      setMessage("User registered successfully ✅");
    } catch (error) {
      setMessage("Signup failed ❌");
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
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>

        <button type="button" onClick={() => navigate("/login")} style={{margin: "10px"}}>Back to Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Signup;
