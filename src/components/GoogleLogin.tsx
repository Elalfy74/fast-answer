import { LoadingButton } from '@mui/lab';

import GoogleLogo from './GoogleLogo';

const GoogleLogin = () => {
  return (
    <LoadingButton
      disableElevation
      type="button"
      fullWidth
      loading={false}
      // loading={loading === 'pending'}
      variant="outlined"
      startIcon={<GoogleLogo />}
      color="info"
      sx={{ mt: 2, mb: 2 }}
    >
      Sign In With Google
    </LoadingButton>
  );
};

export default GoogleLogin;
