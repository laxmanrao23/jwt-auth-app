import { useState } from "react";
import axios from "../Api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, SetEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post("/auth/forgot-password", { username, email });
    alert("OTP sent");
    navigate("/ResetPassword");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input placeholder="Email" onChange={(e) => SetEmail(e.target.value)}/>
      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
}
