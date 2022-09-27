import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';

import { useAuth } from '../contexts/AuthContext';
import { getUserById, saveUserData } from '../services/users';
import { GoogleLogo } from './svg';

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();

  const { mutate, isLoading } = useMutation(signInWithGoogle, {
    onSuccess: async (data) => {
      const user = await getUserById(data.user.uid);

      const displayNameAsArray = data.user.displayName?.split(' ');

      if (!user.Email) {
        await saveUserData({
          id: data.user.uid,
          Email: data.user.email!,
          FirstName: displayNameAsArray![0],
          LastName: displayNameAsArray ? displayNameAsArray[1] : undefined,
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
