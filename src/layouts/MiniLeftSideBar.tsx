import { Login, Logout } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

import { Logo } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { LeftSideBarListPrivate, LeftSideBarListPublic } from './LeftSideBar';

const MiniLeftSideBar = () => {
  const { currentUser, logout } = useAuth();
  const linksList = currentUser
    ? LeftSideBarListPrivate
    : LeftSideBarListPublic;

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
        {linksList.map((item) => (
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
              {({ isActive }) => (
                <ListItemIcon
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title={item.label}>
                    <IconButton color={isActive ? 'primary' : 'info'}>
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
              )}
            </NavLink>
          </ListItem>
        ))}
        {currentUser && (
          <ListItem
            sx={{
              px: { xs: 0, xl: '32px' },
              mb: '10px',
              mx: 'auto',
            }}
          >
            <ListItemIcon
              sx={{
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
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
              px: { xs: 0, xl: '32px' },
              mx: 'auto',
              mb: '10px',
            }}
          >
            <Link
              to="/auth/login"
              style={{
                width: '100%',
              }}
            >
              <ListItemIcon
                sx={{
                  width: '100%',
                  display: { xs: 'none', sm: 'flex' },
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

export default MiniLeftSideBar;
