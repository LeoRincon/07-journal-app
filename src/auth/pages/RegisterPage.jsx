import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Link, Alert } from '@mui/material';

import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';

const fromData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  displayName: [(value) => value.length >= 1, 'The Name is mandatory'],
  email: [(value) => value.includes('@'), 'The email must have an @ '],
  password: [
    (value) => value.length >= 6,
    'The password must have a minimum of 6 characters.',
  ],
};
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(fromData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Name'
              type='text'
              placeholder='Name lastname'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='example@email.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant='contained'
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Do you have account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
