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
export const signup = async (username, password, email) => {
  try {
    const response = await axios.post("/setup/create-user", {
      username,
      password,
      email
    });

    return response.data; // success case

  } catch (error) {

    // 🔥 THIS IS THE KEY FIX
    if (error.response && error.response.data) {
      // backend error (409, 500, etc.)
      throw error.response.data;
    }

    // network / server down case
    throw {
      errorCode: "NETWORK_ERROR",
      message: "Server is unreachable. Please try again later."
    };
  }
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

