import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import {
  errorMessages,
  validateEmail,
  validatePassword,
} from '../../utils/validators';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const { sendRequest, loading, error } = useHttp(login, false);

  function getErrorMessage() {
    if (!error) return '';
    if (
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/user-not-found'
    ) {
      return 'Wrong Email or Password';
    }
    return 'Something went wrong Please try again';
  }

  const loginError = getErrorMessage();

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
  // End Input Hook Usage

  const formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendRequest({ email: emailValue, password: passwordValue });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };

  return (
    <Stack
      minWidth="50vw"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box
        px={2}
        maxWidth="100%"
        sx={{
          width: {
            xs: '600px',
            lg: '80%',
          },
        }}
      >
        <Box textAlign="center" mb={3}>
          <Logo />
          <Typography variant="h5" fontWeight="500">
            Login To Fast Answer
          </Typography>
          {loginError && (
            <Alert
              icon={false}
              severity="error"
              sx={{ mt: 4, mb: 1, width: '100%' }}
            >
              {loginError}
            </Alert>
          )}
        </Box>
        <Box component="form" noValidate onSubmit={submitHandler}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={!!emailError}
            helperText={emailError}
          />
          <FormControl
            sx={{ width: '100%', mb: '8px', mt: '16px' }}
            variant="outlined"
            required
          >
            <InputLabel htmlFor="password" error={!!passwordError}>
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={!!passwordError}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-helper-text" error>
              {passwordError}
            </FormHelperText>
          </FormControl>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <LoadingButton
            disableElevation
            disabled={!formIsValid}
            type="submit"
            fullWidth
            loading={loading === 'pending'}
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            variant="contained"
          >
            Sign In
          </LoadingButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link to="/auth/forgetpassword">
              <Typography variant="body2" color="primary.500">
                Forgot password?
              </Typography>
            </Link>
            <Link to="/auth/signup">
              <Typography variant="body2" color="primary.500">
                Do not have an account? Sign Up
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginForm;
