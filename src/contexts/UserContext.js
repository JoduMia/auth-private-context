import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const authContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

//Main function here----------->
const UserContext = ({children}) => {

  const [user,setUser] = useState('');
  const [isLoading,setIsLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth,email,password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth,email);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
      console.log('auth state changed', currentUser);
    });

    return () => {
      unsubscribe();
    }
  } ,[])

  const authInfo = {createUser, signIn, passwordReset, signOutUser, googleSignIn, user, isLoading, setUser};

  return (
    <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
  )
}

export default UserContext