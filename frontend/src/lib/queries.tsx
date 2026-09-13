import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "./api";
import { login as loginApi } from "./api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
export function useSignup() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Signup Successful");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
}
