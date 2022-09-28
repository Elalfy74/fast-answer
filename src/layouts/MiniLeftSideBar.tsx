import { Login, Logout } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Logo } from '../components';
import { Ask } from '../components/svg';
import { useAuth } from '../contexts/AuthContext';
import { LeftSideBarListPrivate, LeftSideBarListPublic } from './LeftSideBar';

const MiniLeftSideBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const linksList = currentUser
    ? LeftSideBarListPrivate
    : LeftSideBarListPublic;

  const handleAsk = () => {
    if (currentUser) {
      navigate('/ask-question');
    } else {
      navigate('/auth/login');
    }
  };

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
              end
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
        <ListItem sx={{ px: { xs: 0, xl: '32px' }, mb: '10px' }}>
          <ListItemIcon
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Tooltip title="Ask">
              <IconButton onClick={handleAsk}>
                <Ask />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        {currentUser && (
          <ListItem
            sx={{
              px: { xs: 0, xl: '32px' },
              mb: '10px',
              mt: 8,
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
              width: '70%',
              justifyContent: 'center',
              px: { xs: 0, xl: '32px' },
              mx: 'auto',
              mb: '10px',
              mt: 8,
              borderTop: '1px solid ',
              borderColor: 'divider',
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
