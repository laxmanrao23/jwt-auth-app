import api from "./axiosConfig";

// 🛒 ADD TO CART
export const addToCart = (data) => {
  console.log("📦 Api called addToCart", data);
  return api.post("/cart/add", data);
};

// 📥 GET CART
export const getCart = (username) => {
  return api.get(`/cart/${username}`);
};

// 🔄 UPDATE QUANTITY
export const updateCartQuantity = (id, quantity) => {
  return api.put(`/cart/update/${id}?quantity=${quantity}`);
};

// ❌ DELETE ITEM
export const deleteCartItem = (id) => {
  return api.delete(`/cart/${id}`);
};
