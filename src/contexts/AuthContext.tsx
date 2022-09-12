import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import * as Auth from "firebase/auth";

type AuthContextTypes = {
  currentUser: Auth.User | null;
  login: (email: string, password: string) => Promise<Auth.UserCredential>;
  signup: (email: string, password: string) => Promise<Auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
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

  function updateEmail(email: string) {
    return Auth.updateEmail(currentUser!, email);
  }

  function updatePassword(password: string) {
    return Auth.updatePassword(currentUser!, password);
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
};

export default AuthProvider;
