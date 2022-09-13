import React, { createContext, useContext, useState, useEffect } from "react";
import * as Auth from "firebase/auth";
import { auth } from "../firebase-config";

type AuthContextTypes = {
  currentUser: Auth.User | null;
  login: (email: string, password: string) => Promise<Auth.UserCredential>;
  signup: (email: string, password: string) => Promise<Auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
};

// eslint-disable-next-line prettier/prettier
const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<Auth.User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return Auth.createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return Auth.signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return Auth.signOut(auth);
  }

  function resetPassword(email: string) {
    return Auth.sendPasswordResetEmail(auth, email);
  }

  // eslint-disable-next-line consistent-return
  function updateEmail(email: string) {
    if (currentUser) {
      return Auth.updateEmail(currentUser, email);
    }
  }

  // eslint-disable-next-line consistent-return
  function updatePassword(password: string) {
    if (currentUser) {
      return Auth.updatePassword(currentUser, password);
    }
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: AuthContextTypes = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;