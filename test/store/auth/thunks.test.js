import {
  signInWithGoogle,
  loginWithEmailPassword,
  logoutFirebase,
} from '../../../src/firebase/providers';
import {
  checkingCredential,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');
const dispatch = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe('testing on `authThunks`', () => {
  it('should call the `checkingCredentials` ', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredential());
  });

  it('should call `startGoogleSignIn` with `checkingCredentials` and `Login` successfully', async () => {
    const loginData = { isSuccessful: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredential());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('should call `startGoogleSignIn` with `checkingCredentials` and `Login` wrongly', async () => {
    const loginData = { isSuccessful: false, errorMessage: 'Google error' };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredential());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  it('should call the `startLoginWithEmailPassword` with `checkingCredentials` and `Login` successfully', async () => {
    const loginData = { isSuccessful: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredential());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('should call the `startLoginWithEmailPassword` with `checkingCredentials` and `Login` wrongly', async () => {
    const loginData = { isSuccessful: false, errorMessage: 'Google error' };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredential());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it('should call the `startLoginWithEmailPassword` with `clearNotes` and `logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
