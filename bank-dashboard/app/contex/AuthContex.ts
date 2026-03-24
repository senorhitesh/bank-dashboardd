// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { AuthUser } from "../lib/auth";
// import { getUser, removeUser } from "../lib/session";

// interface AuthContextType {
//   user: AuthUser | null;
//   setUser: (user: AuthUser | null) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUserState] = useState<AuthUser | null>(null);

//   useEffect(() => {
//     // Rehydrate from localStorage on mount
//     const saved = getUser();
//     if (saved) setUserState(saved);
//   }, []);

//   function setUser(u: AuthUser | null) {
//     setUserState(u);
//   }

//   function logout() {
//     removeUser();
//     setUserState(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }
