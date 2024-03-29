import {
  Bookmark,
  BookmarkBorderOutlined,
  BorderColor,
  BorderColorOutlined,
  Mail,
  MailOutlined,
  Person,
  PersonOutlined,
  QuestionAnswer,
  QuestionAnswerOutlined,
  Tag,
  TagOutlined,
} from '@mui/icons-material';
import { BottomNavigationAction, Box, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const publicList = [
  {
    label: 'Questions',
    activeIcon: <QuestionAnswer />,
    icon: <QuestionAnswerOutlined />,
    path: '/',
  },

  {
    label: 'Profile',
    activeIcon: <Person />,
    icon: <PersonOutlined />,
    path: '/auth/login',
  },
];

const privateList = [
  {
    label: 'Questions',
    activeIcon: <QuestionAnswer />,
    icon: <QuestionAnswerOutlined />,
    path: '/',
  },
  {
    label: 'Messages',
    activeIcon: <Mail />,
    icon: <MailOutlined />,
    path: '/chat',
  },
  {
    label: 'Ask',
    activeIcon: <BorderColor />,
    icon: <BorderColorOutlined />,
    path: '/ask-question',
  },
  // {
  //   label: 'Favourites',
  //   activeIcon: <Bookmark />,
  //   icon: <BookmarkBorderOutlined />,
  //   path: '/favorites',
  // },
  // {
  //   label: 'Tags',
  //   activeIcon: <Tag />,
  //   icon: <TagOutlined />,
  //   path: '/tags',
  // },
  {
    label: 'Profile',
    activeIcon: <Person />,
    icon: <PersonOutlined />,
    path: '/profile',
  },
];

const BottomNavigationBar = () => {
  const { currentUser } = useAuth();

  const linksList = currentUser ? privateList : publicList;

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
      <Box
        sx={{
          display: 'flex',
          pt: 2,
          justifyContent: 'space-around',
        }}
      >
        {linksList.map((link) => (
          <NavLink to={link.path} key={link.label} end>
            {({ isActive }) => (
              <BottomNavigationAction
                label={link.label}
                showLabel
                icon={isActive ? link.activeIcon : link.icon}
                sx={{
                  color: isActive ? 'primary.main' : 'text.secondary',
                }}
              />
            )}
          </NavLink>
        ))}
      </Box>
    </Paper>
  );
};

export default BottomNavigationBar;
