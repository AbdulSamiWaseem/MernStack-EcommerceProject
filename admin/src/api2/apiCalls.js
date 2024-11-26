import apiRequest from "."

export const getAllUsers = async () => await apiRequest("GET", "users")
export const getLatestUsers = async () => await apiRequest("GET", "users/?new=true")
export const getOrder = async () => await apiRequest("GET", "orders")
export const getUsersStats = async () => await apiRequest("GET", "users/stats")
export const getIncome = async () => await apiRequest("GET", "orders/income")
export const getAllProducts = async () => await apiRequest("GET", "products")
export const deleteProduct = async (id) => await apiRequest("DELETE", `products/${id}`)
export const getProductStats = async (id) => await apiRequest("GET", "orders/income?pid=" + id)
export const addProduct = async (product) => await apiRequest("POST", "products", product, true)
export const updateProducts = async (product, productId) => await apiRequest("PUT", `products/${productId}`, product, true)
export const loginUser = async (user) => await apiRequest("POST", "auth/login", user)
export const updateUser = async (user, userId) => await apiRequest("PUT", `users/${userId}`, user)
export const createUser = async (user) => await apiRequest("POST", "users", user)

