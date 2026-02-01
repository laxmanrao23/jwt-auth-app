import { useState } from "react";
import axios from "../Api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, SetEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    await axios.post("/auth/reset-password", {
      username,
      otp,
      newPassword: password,
      email
    });
    alert("Password updated");
    navigate("/login");
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input 
            type="text" placeholder="Email" 
            //value={email}
            onChange={(e) => SetEmail(e.target.value)}
        />
      <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
      <input placeholder="New Password" type="password"
             onChange={e => setPassword(e.target.value)} />

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
