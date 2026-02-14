import api from "./axiosConfig";

export const getAllProducts = () => {
    return api.get("/products");
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
}