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
