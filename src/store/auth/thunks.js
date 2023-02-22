import {
  signInWithGoogle,
  signInWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from '../../firebase';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredential, logout, login } from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredential());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredential());
    const result = await signInWithGoogle();
    if (!result.isSuccessful) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredential());

    const { isSuccessful, uid, photoURL, errorMessage } =
      await signInWithEmailPassword({
        email,
        password,
        displayName,
      });
    if (!isSuccessful) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredential());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.isSuccessful) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
