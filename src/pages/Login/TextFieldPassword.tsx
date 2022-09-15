import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';

type PasswordProps = {
  error: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};
const TextFieldPassword = ({
  error,
  value,
  onChange,
  onBlur,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl
      sx={{ width: '100%', mb: '8px', mt: '16px' }}
      variant="outlined"
      required
    >
      <InputLabel htmlFor="password" error={!!error}>
        Password
      </InputLabel>
      <OutlinedInput
        fullWidth
        name="password"
        label="Password"
        id="password"
        autoComplete="password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
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
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default TextFieldPassword;
