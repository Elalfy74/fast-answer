import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleLogin, Logo } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import useInput from '../../hooks/use-input';
import { isFirebaseError } from '../../utils/firebase-error';
import {
  errorMessages,
  validateEmail,
  validatePassword,
} from '../../utils/validators';
import { TextFieldPassword } from '.';

const LoginForm = () => {
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

  const { login } = useAuth();

  const { mutate, isLoading, error } = useMutation(login);

  const formIsValid = emailIsValid && passwordIsValid;

  function getErrorMessage() {
    if (!error) return '';
    if (isFirebaseError(error)) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        return 'Wrong Email or Password';
      }
    }
    return 'Something went wrong. Please try again later.';
  }

  const loginError = getErrorMessage();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email: emailValue, password: passwordValue });
  };

  return (
    <Stack
      minWidth="50vw"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{
        display: {
          xs: 'block',
          lg: 'flex',
        },
      }}
    >
      <Box
        px={2}
        maxWidth="100%"
        mx="auto"
        sx={{
          width: {
            xs: '600px',
            lg: '80%',
          },
          py: {
            xs: '10vh',
            lg: 0,
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
          <TextFieldPassword
            error={passwordError}
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link to="/auth/forgetpassword">
              <Typography variant="body2" color="primary.500">
                Forgot password?
              </Typography>
            </Link>
          </Stack>

          <LoadingButton
            disableElevation
            disabled={!formIsValid}
            type="submit"
            fullWidth
            loading={isLoading}
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
          >
            Log In
          </LoadingButton>
          <Divider>OR</Divider>
          <GoogleLogin />
          <Typography variant="body2" textAlign="center" mt={2} color="gray">
            Do not have an account?{' '}
            <Link to="/auth/signup">
              <Typography component="span" variant="body2" color="primary.500">
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginForm;
