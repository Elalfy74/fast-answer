import { LocationOnOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import avatar from '../../assets/avatar.jpg';
import { TagsList } from '../../components';

type TabPanelProps = {
  children: React.ReactNode;
  index: number;
  value: number;
};
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfile = () => {
  const [value, setValue] = useState(0);
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };
  return (
    <Stack direction="row" gap={10}>
      <Box flex={1}>
        <Avatar
          src={avatar}
          variant="square"
          alt="user-avatar"
          sx={{
            width: 200,
            height: 200,
            mb: 2,
          }}
        />
        <Divider
          textAlign="left"
          sx={{
            mt: 2,
            mb: 1,
          }}
        >
          Bio
        </Divider>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Typography>
        <Divider
          textAlign="left"
          sx={{
            mt: 2,
            mb: 1,
          }}
        >
          Interests
        </Divider>
        <TagsList
          tags={[
            {
              id: '1',
              name: 'React',
            },
            {
              id: '2',
              name: 'React',
            },
            {
              id: '3',
              name: 'React',
            },
          ]}
        />
      </Box>
      <Stack flex={2}>
        <Stack direction="row" gap={2}>
          <Typography variant="h5" component="h1">
            Mahmoud Ramadan
          </Typography>
          <Stack direction="row" alignItems="center" color="gray">
            <LocationOnOutlined />
            <Typography variant="body2" component="p">
              Cairo Egypt
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body2" component="p" mt={1} color="primary">
          Frontend Developer
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          mt={4}
          sx={{
            gap: {
              xs: 1,
              sm: 2,
              md: 6,
            },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: '120px',
            }}
          >
            Chat
          </Button>
          <Button
            variant="contained"
            sx={{
              width: '120px',
            }}
          >
            Follow
          </Button>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 6 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="About" />
            <Tab label="Questions" />
            <Tab label="Answers" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography variant="overline">Contact Information</Typography>
          <List>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2}>
                Email:
              </Typography>
              <Typography variant="body2" color="primary">
                mahmoudelalfy13@gmail.com
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2}>
                Address:
              </Typography>
              <Typography variant="body2">
                6th of October, Cairo, Egypt
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2}>
                Phone:
              </Typography>
              <Typography variant="body2" color="primary">
                01000000000
              </Typography>
            </ListItem>
          </List>
          <Typography variant="overline">Basic Information</Typography>
          <List>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2}>
                Birthdate:
              </Typography>
              <Typography variant="body2">June 5, 1996</Typography>
            </ListItem>
            <ListItem disableGutters>
              <Typography variant="body2" mr={2}>
                Gender:
              </Typography>
              <Typography variant="body2">Male</Typography>
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
