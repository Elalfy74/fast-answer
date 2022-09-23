import { LoadingButton } from '@mui/lab';
import { doc } from 'firebase/firestore';
import { useMutation } from 'react-query';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase-config';
import { getUserByRef, saveUserData } from '../services/users';
import GoogleLogo from './GoogleLogo';

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();

  const { mutate, isLoading } = useMutation(signInWithGoogle, {
    onSuccess: async (data) => {
      console.log(data.user);

      const userRef = doc(db, 'users', data.user.uid);

      const user = await getUserByRef(userRef);

      if (!user) {
        saveUserData({
          userId: data.user.uid,
          Email: data.user.email!,
          FirstName: data.user.displayName!,
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
