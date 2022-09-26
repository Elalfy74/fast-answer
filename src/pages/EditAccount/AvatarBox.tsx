import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { storage } from '../../firebase-config';

type AvatarBoxProps = {
  avatar?: string;
  bio?: string;
  onChangeHandler: (value: string, newValue: string) => void;
};

const AvatarBox = ({ avatar, bio, onChangeHandler }: AvatarBoxProps) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const uploadFile = () => {
      if (!file) return;
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setData((prev) => ({ ...prev, img: downloadURL }));
            console.log(downloadURL);
            onChangeHandler('PhotoUrl', downloadURL);
          });
        }
      );
    };
    if (file) {
      uploadFile();
    }
  }, [file, onChangeHandler]);

  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        width: { sm: '100%', md: '28%' },
        order: {
          xs: 1,
          md: 2,
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
            src={file ? URL.createObjectURL(file) : avatar}
            sx={{ width: 200, height: 200 }}
          />
          <Stack>
            <InputLabel htmlFor="file">
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
              id="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ display: 'none' }}
            />
          </Stack>
        </Stack>
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Typography fontWeight="500">@0xRamadan</Typography>
            <EditIcon fontSize="small" />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Typography fontWeight="500">Bio</Typography>
            <EditIcon fontSize="small" />
          </Stack>
          <Divider />
          <Typography sx={{ mt: 2, alignSelf: 'center', fontStyle: 'italic' }}>
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            corporis nostrum ad magni deleniti voluptatum voluptates in sit
            exercitationem rem sapiente aut neque nisi.&quot;
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AvatarBox;
