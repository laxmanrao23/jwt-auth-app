import { useEffect, useState } from "react";
import axios from "../Api/axiosConfig";
import { logout, deleteAccount } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("jobs"); // ✅ NEW

  const navigate = useNavigate();
  const currentUsername = localStorage.getItem("username");

  // ✅ Fetch Jobs (existing logic untouched)
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

  // ✅ DELETE HANDLER (unchanged)
  const handleDelete = async () => {
    if (!currentUsername) {
      alert("User not found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account."
    );
    if (!confirmDelete) return;

    try {
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

      {/* 🔹 TOP NAVIGATION */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveView("jobs")}>Jobs</button>
        <button onClick={() => setActiveView("products")}>Products</button>
        <button onClick={() => setActiveView("cart")}>Cart</button>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{ marginLeft: 20 }}
        >
          Logout
        </button>
      </div>

      {/* 🔹 CONTENT AREA */}
      {activeView === "jobs" && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {jobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          )}
        </>
      )}

      {activeView === "products" && <Products />}

      {activeView === "cart" && <Cart />}

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
