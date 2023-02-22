import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      isSuccessful: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      isSuccessful: false,
      errorMessage,
    };
  }
};

export const signInWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = resp.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      isSuccessful: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      isSuccessful: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;
    return {
      isSuccessful: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return {
      isSuccessful: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
