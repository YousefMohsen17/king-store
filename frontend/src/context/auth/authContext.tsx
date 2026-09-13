import { AuthContext } from "./authContextObject";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../../types/types";
import { checkAuth as checkAuthApi, logout as logoutApi } from "../../lib/api";
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data }: { data: UserType } = await checkAuthApi();
        return data;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  async function logout() {
    const result = await logoutApi();
    queryClient.setQueryData(["authUser"], null); // update cached auth state
    return result;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user: data ?? null, authenticated: !!data, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
