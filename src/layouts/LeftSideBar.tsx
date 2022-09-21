import {
  Bookmark,
  Feed,
  Leaderboard,
  Login,
  Logout,
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

export const LeftSideBarList = [
  // {
  //   label: 'Home',
  //   icon: <Feed />,
  // },
  {
    label: 'Questions',
    icon: <QuestionAnswer />,
    path: '/',
  },
  {
    label: 'Favourites',
    icon: <Bookmark />,
    path: '/',
  },
  {
    label: 'Tags',
    icon: <Tag />,
    path: '/',
  },
  {
    label: 'Leaderboard',
    icon: <Leaderboard />,
    path: '/',
  },
  {
    label: 'My Account',
    icon: <Person />,
    path: '/',
  },
];

const LeftSideBar = () => {
  const { currentUser, logout } = useAuth();
  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 20,
      }}
    >
      <List
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '8px',
        }}
      >
        <ListItem>
          <Logo />
        </ListItem>
        {LeftSideBarList.map((item, index) => (
          <ListItem
            key={item.label}
            sx={{ px: { xs: 0, xl: '32px' }, mb: '10px' }}
          >
            <NavLink
              to={item.path}
              style={{
                width: '100%',
              }}
            >
              <Button
                disableElevation
                color={index === 0 ? 'primary' : 'info'}
                component="div"
                variant={index === 0 ? 'contained' : 'text'}
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
                    color: index === 0 ? 'white' : 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ fontWeight: '500' }}
                  disableTypography
                />
              </Button>

              <ListItemIcon
                sx={{
                  width: '100%',
                  display: { xs: 'none', sm: 'flex', xl: 'none' },
                  justifyContent: 'center',
                }}
              >
                <Tooltip title={item.label}>
                  <IconButton color="primary">{item.icon}</IconButton>
                </Tooltip>
              </ListItemIcon>
            </NavLink>
          </ListItem>
        ))}
        {currentUser && (
          <ListItem
            sx={{
              px: { xs: 0, xl: 6 },
              mb: '10px',
            }}
          >
            <Button
              variant="outlined"
              type="button"
              onClick={logout}
              sx={{ display: { xs: 'none', xl: 'flex' } }}
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
              px: { xs: 0, xl: 6 },
              mb: '10px',
            }}
          >
            <Link
              to="/auth/login"
              style={{
                width: '100%',
              }}
            >
              <Button
                variant="outlined"
                type="button"
                sx={{ display: { xs: 'none', xl: 'flex' } }}
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
