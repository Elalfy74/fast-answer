import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import { GoogleLogin, Logo } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import useInput from '../../hooks/use-input';
import { saveUserData } from '../../services/users';
import { isFirebaseError } from '../../utils/firebase-error';
import {
  errorMessages,
  validateEmail,
  validateFirstName,
  validatePassword,
} from '../../utils/validators';
import { TextFieldPassword } from '../Login';

const Signup = () => {
  const { signup } = useAuth();

  // Start Input Hook Usage
  const {
    value: emailValue,
    isValid: emailIsValid,
    error: emailError,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput(validateEmail, errorMessages.emailMessage);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    error: passwordError,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword, errorMessages.passwordMessage);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    error: firstNameError,
    onChangeHandler: firstNameChangeHandler,
    onBlurHandler: firstNameBlurHandler,
  } = useInput(validateFirstName, errorMessages.firstNameMessage);
  // End Input Hook Usage

  const lastNameValue = useRef<HTMLInputElement>(null);

  const signupAndSaveUserData = async () => {
    const user = await signup({ email: emailValue, password: passwordValue });

    await saveUserData({
      userId: user.user.uid,
      FirstName: firstNameValue,
      LastName: lastNameValue.current?.value,
      Email: emailValue,
    });
  };

  const { mutate, isLoading, error } = useMutation(signupAndSaveUserData);

  function getErrorMessage() {
    if (!error) return '';
    if (isFirebaseError(error)) {
      if (error.code === 'auth/email-already-in-use') {
        return 'Email is already Registered';
      }
    }
    return 'Something went wrong Please try again';
  }

  const signupError = getErrorMessage();

  const formIsValid = firstNameIsValid && emailIsValid && passwordIsValid;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <Box
      px={2}
      maxWidth="100%"
      width="600px"
      mx="auto"
      sx={{
        py: {
          xs: '10vh',
        },
      }}
    >
      <Box textAlign="center" mb={3}>
        <Logo />
        <Typography component="h1" variant="h5" fontWeight="500" mt={2}>
          Signup To Fast Answer
        </Typography>
        {signupError && (
          <Alert
            icon={false}
            severity="error"
            sx={{ mt: 4, mb: 1, width: '100%' }}
          >
            {signupError}
          </Alert>
        )}
      </Box>
      <Box component="form" noValidate onSubmit={submitHandler} width="100%">
        <Grid container columnSpacing={2}>
          {/* Start Of First Name And Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              error={!!firstNameError}
              helperText={firstNameError}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              inputRef={lastNameValue}
            />
          </Grid>
          {/* End Of First Name And Last Name */}
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldPassword
              error={passwordError}
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              disableElevation
              disabled={!formIsValid}
              type="submit"
              fullWidth
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              variant="contained"
            >
              Sign Up
            </LoadingButton>
            <Divider textAlign="center">OR</Divider>
            <GoogleLogin />
          </Grid>
        </Grid>
      </Box>
      <Typography variant="body2" textAlign="center" mt={2} color="gray">
        Already have an account?{' '}
        <Link to="/auth/login">
          <Typography component="span" variant="body2" color="primary.500">
            Log in
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
