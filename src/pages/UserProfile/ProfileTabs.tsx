import {
  Box,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { User } from '../../data/global.types';
import { TabPanel } from '.';

type ProfileTapsProps = {
  data: User | undefined;
};

const ProfileTabs = ({ data }: ProfileTapsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Stack flex={2} sx={{ alignItems: { xs: 'center', lg: 'flex-start' } }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="About" />
          <Tab label="Questions" />
          <Tab label="Contribution" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="overline" fontWeight="500">
          Contact Information
        </Typography>
        <List>
          <ListItem disableGutters>
            <Typography variant="body2" mr={2} fontWeight="500">
              Email:
            </Typography>
            <Typography variant="body2" color="primary">
              {data?.email}
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body2" mr={2} fontWeight="500">
              Conutry:
            </Typography>
            <Typography variant="body2">{data?.country}</Typography>
          </ListItem>
        </List>
        <Typography variant="overline" fontWeight="500">
          Basic Information
        </Typography>
        <List>
          <ListItem disableGutters>
            <Typography variant="body2" mr={2} fontWeight="500">
              Birthdate:
            </Typography>
            <Typography variant="body2">{data?.birthdate}</Typography>
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
  );
};

export default ProfileTabs;
