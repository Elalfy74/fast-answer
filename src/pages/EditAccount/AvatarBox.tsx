import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FormikState, useFormik } from 'formik';
import { ChangeEventHandler, useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase-config';
import { updateUserData } from '../../services/users';

export const validationSchema = Yup.object({
  userName: Yup.string().required('Required'),
});

type FormikValues = {
  avatar: string;
  bio: string;
  userName: string;
};

type AvatarBoxProps = {
  initialValues: FormikValues;
};

type ResetForm = (
  nextState?: Partial<FormikState<FormikValues>> | undefined
) => void;

const AvatarBox = ({ initialValues }: AvatarBoxProps) => {
  const { currentUser } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userNameEdit, setUserNameEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);

  const [successOpen, setSucess] = useState(false);

  const handleCancel = (resetForm: ResetForm, values?: FormikValues) => {
    setBioEdit(false);
    setUserNameEdit(false);

    if (values) {
      resetForm({ values });
    } else {
      resetForm();
    }
  };

  const handleSaveUserData = async (
    resetForm: ResetForm,
    values: FormikValues
  ) => {
    setIsLoading(true);

    await updateUserData({
      id: currentUser!.uid,
      ...values,
    });

    handleCancel(resetForm, values);
    setIsLoading(false);
    setSucess(true);
  };

  const uploadFile = (userName: string, bio: string, resetForm: ResetForm) => {
    if (!file) return;
    const name = new Date().getTime() + file.name;

    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setIsLoading(true);

    uploadTask.on(
      'state_changed',
      undefined,
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await handleSaveUserData(resetForm, {
          avatar: downloadURL,
          userName,
          bio,
        });
      }
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, submitProps) => {
      if (file) {
        uploadFile(values.userName, values.bio, submitProps.resetForm);
        return;
      }
      handleSaveUserData(submitProps.resetForm, formik.values);
    },
  });

  const handleImgChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files![0]);

    formik.setFieldValue(
      'avatar',
      URL.createObjectURL(e.target.files![0]) || ''
    );
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSucess(false);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        width: { sm: '100%', lg: '28%' },
        order: {
          xs: 1,
          lg: 2,
        },
      }}
    >
      <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
        Avatar
      </Typography>
      <Divider />
      <Stack sx={{ m: 2 }}>
        <Stack alignItems="center">
          <Avatar
            alt="user avatar"
            src={formik.values.avatar}
            sx={{
              width: 200,
              height: 200,
              objectFit: 'contain',
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <Stack>
            <InputLabel htmlFor="avatar">
              <Tooltip
                title="Upload"
                sx={{
                  mt: 1,
                  cursor: 'pointer',
                }}
              >
                <FileUploadIcon />
              </Tooltip>
            </InputLabel>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImgChange}
              style={{ display: 'none' }}
            />
          </Stack>
        </Stack>
        <Stack>
          {!userNameEdit && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography fontWeight="500">
                @{formik.values.userName}
              </Typography>
              <IconButton onClick={() => setUserNameEdit(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
          {userNameEdit && (
            <TextField
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              size="small"
            />
          )}
          {!bioEdit && (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{
                  mt: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography fontWeight="500">Bio</Typography>
                <IconButton onClick={() => setBioEdit(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Typography
                sx={{ mt: 2, alignSelf: 'center', fontStyle: 'italic' }}
              >
                {formik.values.bio || 'No bio'}
              </Typography>
            </>
          )}
          {bioEdit && (
            <TextField
              sx={{
                mt: 2,
                alignSelf: 'center',
                width: '100%',
              }}
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              multiline
              maxRows={6}
            />
          )}
        </Stack>
      </Stack>

      <Stack gap={3}>
        {formik.dirty && (
          <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={isLoading}
          >
            Save
          </LoadingButton>
        )}
        {(bioEdit || userNameEdit || formik.dirty) && (
          <Button
            fullWidth
            onClick={() => handleCancel(formik.resetForm)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </Stack>
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your data has been Changed Successfuly
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AvatarBox;
