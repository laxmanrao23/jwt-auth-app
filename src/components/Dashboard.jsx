import { useEffect, useState } from "react";
import axios from "../Api/axiosConfig";
import { logout, deleteAccount } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Get username (must be stored at login)

  const currentUsername = localStorage.getItem("username");
 console.log(currentUsername);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [navigate]);

  // ✅ DELETE HANDLER
  const handleDelete = async () => {
    debugger;
    if (!currentUsername) {
      alert("User not found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account."
    );
    if (!confirmDelete) return;

    try {
      debugger;
      await deleteAccount(currentUsername);
      alert("Account deleted successfully");
      logout();
      navigate("/signup");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <button onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul>
      )}

      {/* 🔴 DELETE ACCOUNT */}
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "white", marginTop: "20px" }}
      >
        Delete Account
      </button>
    </div>
  );
}
