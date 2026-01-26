import axios from "../Api/axiosConfig";


// ✅ LOGIN
export const login = async (username, password) => {
  const res = await axios.post("/auth/login", {
    username,
    password,
  });

  // 🔥 VERY IMPORTANT: store ONLY token
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("username", username);

  return res.data;
};

// ✅ SIGNUP
export const signup = async (username, password) => {
  return axios.post("/setup/create-user", {
    username,
    password,
  });
};

// ✅ LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};

// ✅ AUTH CHECK
export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

export const deleteAccount = async (username) => {
  debugger;
  return axios.delete("/auth/delete", {
    data: {
      username: username
    }
  });
};

