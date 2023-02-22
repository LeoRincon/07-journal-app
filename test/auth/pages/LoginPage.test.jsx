import { fireEvent, render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticateState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticateState,
  },
});

describe('test in `<LoginPage>`', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should show the `<LoginPage>` component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('should call the startGoogleSignIn by clicking on the button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  it('should call the sumit with startLoginWithEmailPassword', () => {
    const email = 'hola@hola.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginField = screen.getByLabelText('submit-form');
    fireEvent.submit(loginField);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
