import type { CreateProductType, LoginType, SignupType } from "../types/types";
import { axiosInstance } from "./axios";
// /////////////////////////////////////////////////////////////////////////
// AUTH API
// /////////////////////////////////////////////////////////////////////////

export async function checkAuth() {
  const { data } = await axiosInstance.get("/auth/check");
  return data;
}
export async function logout() {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
}
export async function signup(values: SignupType) {
  const { data } = await axiosInstance.post("/auth/signup", values);
  return data;
}

export async function login(values: LoginType) {
  const { data } = await axiosInstance.post("/auth/login", values);
  return data;
}
// /////////////////////////////////////////////////////////////////////////
// PRODUCT API
// /////////////////////////////////////////////////////////////////////////
export async function getCategories() {
  const { data } = await axiosInstance.get("/product/categories");
  return data;
}
export async function getFeaturedProducts() {
  const { data } = await axiosInstance.get("/product/featured");
  return data;
}
export async function getProductsByCategory(category: string) {
  const { data } = await axiosInstance.get("/product/category/" + category);
  return data;
}
export async function getAllProducts() {
  const { data } = await axiosInstance.get("/product");
  return data;
}
export async function deleteProduct(id: string) {
  const { data } = await axiosInstance.delete("/product/" + id);
  return data;
}
export async function toggleFeaturedProduct(id: string) {
  const { data } = await axiosInstance.patch("/product/" + id);
  return data;
}
export async function createProduct(values: CreateProductType) {
  const { data } = await axiosInstance.post("/product", values);
  return data;
}
// /////////////////////////////////////////////////////////////////////////
// CART API
// /////////////////////////////////////////////////////////////////////////

export async function addToCart(id: string) {
  const { data } = await axiosInstance.post("/cart/" + id);
  return data;
}
export async function getCart() {
  const { data } = await axiosInstance.get("/cart");
  return data;
}
