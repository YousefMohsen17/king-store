// import axios from "axios";
import type { LoginType, SignupType } from "../types/types";
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
export async function addToCart(id: string) {
  const { data } = await axiosInstance.post("/cart/" + id);
  return data;
}
export async function getCart() {
  const { data } = await axiosInstance.get("/cart");
  return data;
}
