import {
  Bookmark,
  BookmarkBorderOutlined,
  Person,
  PersonOutlined,
  QuestionAnswer,
  QuestionAnswerOutlined,
  Tag,
  TagOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useState } from 'react';

const BottomList = [
  {
    label: 'Questions',
    activeIcon: <QuestionAnswer />,
    icon: <QuestionAnswerOutlined />,
    path: '/',
  },
  {
    label: 'Favourites',
    activeIcon: <Bookmark />,
    icon: <BookmarkBorderOutlined />,
    path: '/',
  },
  {
    label: 'Tags',
    activeIcon: <Tag />,
    icon: <TagOutlined />,
    path: '/',
  },
  {
    label: 'Account',
    activeIcon: <Person />,
    icon: <PersonOutlined />,
    path: '/',
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
        pb: 5,
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
        {BottomList.map((link, index) => (
          <BottomNavigationAction
            key={link.label}
            label={link.label}
            icon={value === index ? link.activeIcon : link.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
