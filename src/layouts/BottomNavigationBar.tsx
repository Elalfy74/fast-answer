import { Bookmark, Person, QuestionAnswer, Tag } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useState } from 'react';

const BottomList = [
  {
    label: 'Questions',
    icon: <QuestionAnswer />,
  },
  {
    label: 'Faviourites',
    icon: <Bookmark />,
  },
  {
    label: 'Tags',
    icon: <Tag />,
  },
  {
    label: 'Account',
    icon: <Person />,
  },
];

const BottomNavigationBar = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          sm: 'none',
        },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {BottomList.map((link) => (
          <BottomNavigationAction
            key={link.label}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
