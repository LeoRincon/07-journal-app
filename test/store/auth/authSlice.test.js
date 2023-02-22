import {
  authSlice,
  checkingCredential,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
} from '../../fixtures/authFixtures';

describe('test on `authSlice`', () => {
  it('should return to the initial state and call the auth ', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });

  it('should do the authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  it('should do the logout without arguments', () => {
    authenticatedState;
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      status: 'not-authenticate',
      errorMessage: undefined,
    });
  });
  it('should do the logout with arguments and show error message', () => {
    const errorMessage = 'incorrect credentials';

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      status: 'not-authenticate',
      errorMessage: errorMessage,
    });
  });

  it('should change the state to checking', () => {
    const state = authSlice.reducer(initialState, checkingCredential());
    expect(state.status).toBe('checking');
  });
});
