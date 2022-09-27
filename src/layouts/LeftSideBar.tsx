import {
  AddBoxOutlined,
  Bookmark,
  Group,
  Login,
  Logout,
  Mail,
  ManageAccounts,
  Person,
  QuestionAnswer,
  Tag,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

import { Logo } from '../components';
import { useAuth } from '../contexts/AuthContext';

export const LeftSideBarListPublic = [
  {
    label: 'Questions',
    icon: <QuestionAnswer />,
    path: '/',
  },
  // {
  //   label: 'Tags',
  //   icon: <Tag />,
  //   path: '/tags',
  // },
];
export const LeftSideBarListPrivate = [
  {
    label: 'Questions',
    icon: <QuestionAnswer />,
    path: '/',
  },
  // {
  //   label: 'Favorites',
  //   icon: <Bookmark />,
  //   path: '/favorites',
  // },
  // {
  //   label: 'Tags',
  //   icon: <Tag />,
  //   path: '/tags',
  // },
  // {
  //   label: 'Users',
  //   icon: <Group />,
  //   path: '/user',
  // },
  {
    label: 'Profile',
    icon: <Person />,
    path: '/profile',
  },
  {
    label: 'Messages',
    icon: <Mail />,
    path: '/chat',
  },
  // {
  //   label: 'Settings',
  //   icon: <ManageAccounts />,
  //   path: '/edit-account',
  // },
];
const LeftSideBar = () => {
  const { currentUser, logout } = useAuth();

  const linksList = currentUser
    ? LeftSideBarListPrivate
    : LeftSideBarListPublic;

  return (
    <Box component="nav">
      <List
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '8px',
        }}
      >
        <ListItem>
          <Logo />
        </ListItem>
        {linksList.map((item) => (
          <ListItem
            key={item.label}
            sx={{ px: { xs: 0, xl: '32px' }, mb: '10px' }}
          >
            <NavLink
              end
              to={item.path}
              style={{
                width: '100%',
              }}
            >
              {({ isActive }) => (
                <Button
                  disableElevation
                  color={isActive ? 'primary' : 'info'}
                  variant={isActive ? 'contained' : 'text'}
                  sx={{
                    width: '100%',
                    borderRadius: '9999px',
                    px: 2,
                    display: { xs: 'none', xl: 'flex' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 'auto',
                      mr: 1,
                      color: isActive ? 'white' : 'gray',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      fontSize: '16px',
                      textAlign: 'left',
                    }}
                    disableTypography
                  />
                </Button>
              )}
            </NavLink>
          </ListItem>
        ))}
        <ListItem sx={{ px: { xs: 0, xl: '32px' }, mb: '10px', mt: 4 }}>
          <Link
            to="/ask-question"
            style={{
              width: '100%',
            }}
          >
            <Button variant="outlined" fullWidth>
              Ask
            </Button>
          </Link>
        </ListItem>
        {currentUser && (
          <ListItem
            sx={{
              width: '90%',
              justifyContent: 'center',
              mt: 8,
              mx: 'auto',
              mb: '10px',
              px: { xs: 0, xl: 4 },
              borderTop: '1px solid ',
              borderColor: 'divider',
            }}
          >
            <Button
              variant="text"
              type="button"
              onClick={logout}
              sx={{ display: { xs: 'none', xl: 'flex' }, mt: 2 }}
            >
              Logout
            </Button>
            <ListItemIcon
              sx={{
                width: '100%',
                display: { xs: 'none', sm: 'flex', xl: 'none' },
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Logout">
                <IconButton color="primary" onClick={logout}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        )}
        {!currentUser && (
          <ListItem
            sx={{
              width: '90%',
              mt: 8,
              mx: 'auto',
              mb: '10px',
              px: { xs: 0, xl: 4 },
              borderTop: '1px solid ',
              borderColor: 'divider',
            }}
          >
            <Link
              to="/auth/login"
              style={{
                width: '100%',
                marginTop: '16px',
              }}
            >
              <Button
                variant="text"
                type="button"
                sx={{ display: { xs: 'none', xl: 'flex' }, mx: 'auto' }}
              >
                Login
              </Button>
              <ListItemIcon
                sx={{
                  width: '100%',
                  display: { xs: 'none', sm: 'flex', xl: 'none' },
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Login">
                  <IconButton color="primary">
                    <Login />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default LeftSideBar;
