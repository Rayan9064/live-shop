'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface User extends FirebaseUser { }

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<{ isNewUser: boolean; needsOnboarding: boolean }>;
  signout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User | null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: displayName,
      createdAt: serverTimestamp(),
    });
  };

  const signin = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Check if user document exists
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      const isNewUser = !userDoc.exists();
      let needsOnboarding = false;

      if (isNewUser) {
        // Create new user document with basic info from Google
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          createdAt: serverTimestamp(),
          onboardingCompleted: false,
        });
        needsOnboarding = true;
      } else {
        // Check if existing user needs onboarding
        const userData = userDoc.data();
        needsOnboarding = !userData?.onboardingCompleted;
      }

      return { isNewUser, needsOnboarding };
    } catch (error: any) {
      // Handle specific popup errors
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        throw new Error('Popup was blocked. Please allow popups for this site and try again.');
      }
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Please contact support.');
      }
      if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Sign-in was cancelled. Please try again.');
      }
      // Re-throw other errors
      throw error;
    }
  };

  const signout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signin,
        signInWithGoogle,
        signout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
