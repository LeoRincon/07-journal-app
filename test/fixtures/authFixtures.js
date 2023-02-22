export const initialState = {
  status: 'checking', //'checking',  'not-authenticate', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
export const authenticatedState = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'example@example.com',
  displayName: 'Example User',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
};
export const notAuthenticateState = {
  status: 'not-authenticate',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
export const demoUser = {
  uid: '123ABC',
  email: 'example@example.com',
  displayName: 'Example User',
  photoURL: 'https://demo.jpg',
};
