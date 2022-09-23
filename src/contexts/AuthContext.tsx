import * as Auth from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../firebase-config';

const provider = new Auth.GoogleAuthProvider();

type SignParams = {
  email: string;
  password: string;
};

type AuthContextTypes = {
  currentUser: Auth.User | null;
  login: ({ email, password }: SignParams) => Promise<Auth.UserCredential>;
  signInWithGoogle: () => Promise<Auth.UserCredential>;
  signup: ({ email, password }: SignParams) => Promise<Auth.UserCredential>;
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

  function signup({ email, password }: SignParams) {
    return Auth.createUserWithEmailAndPassword(auth, email, password);
  }

  function login({ email, password }: SignParams) {
    return Auth.signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    return Auth.signInWithPopup(auth, provider);
  }

  function logout() {
    return Auth.signOut(auth);
  }

  function resetPassword(email: string) {
    return Auth.sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email: string) {
    if (currentUser) {
      return Auth.updateEmail(currentUser, email);
    }
  }

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
    signInWithGoogle,
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
