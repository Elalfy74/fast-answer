import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';

import { useAuth } from '../contexts/AuthContext';
import { getUserById, saveUserData } from '../services/users';
import { GoogleLogo } from './svg';

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();

  const { mutate, isLoading } = useMutation(signInWithGoogle, {
    onSuccess: async (data) => {
      // check if the user is already signed Before
      const user = await getUserById(data.user.uid);

      const displayNameAsArray = data.user.displayName?.split(' ');

      // if new User, then Save data
      if (!user.email) {
        await saveUserData(data.user.uid, {
          email: data.user.email!,
          firstName: displayNameAsArray![0],
          lastName: displayNameAsArray ? displayNameAsArray[1] : '',
        });
      }
    },
  });

  const signInWithGoogleHandler = () => {
    mutate();
  };

  return (
    <LoadingButton
      onClick={signInWithGoogleHandler}
      disableElevation
      type="button"
      fullWidth
      loading={isLoading}
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
