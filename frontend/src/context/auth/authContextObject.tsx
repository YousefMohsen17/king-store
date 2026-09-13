import { createContext, useContext } from "react";
import type { UserType } from "../../types/types";

type AuthContextType = {
  user: UserType | null;
  authenticated: boolean;
  logout: () => Promise<{ message: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}

export { AuthContext };
