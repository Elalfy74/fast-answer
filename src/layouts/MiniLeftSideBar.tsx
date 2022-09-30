import { Login, Logout } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Logo } from '../components';
import { Ask } from '../components/svg';
import { useAuth } from '../contexts/AuthContext';
import { LeftSideBarListPrivate, LeftSideBarListPublic } from './LeftSideBar';
import OverView from './OverView';

const MiniLeftSideBar = () => {
  const [status, setStatus] = useState(false);
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleClose = () => {
    setStatus(false);
  };
  const linksList = currentUser
    ? LeftSideBarListPrivate
    : LeftSideBarListPublic;

  const handleAsk = () => {
    if (currentUser) {
      navigate('/ask-question');
    } else {
      setStatus(true);
      // navigate('/auth/login');
    }
  };

  return (
    <>
      <OverView status={status} handleClose={handleClose}>
        <Typography>You are not logged in</Typography>
        <Button variant="outlined" component={Link} to="/auth/login">
          Login
        </Button>
        <Button variant="text" component={Link} to="/ask-question">
          Ask Anoyomuus
        </Button>
      </OverView>
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
          <Link to="/">
            <ListItem>
              <Logo />
            </ListItem>
          </Link>
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
          <ListItem sx={{ px: { xs: 0, xl: '32px' }, mb: '10px', mt: 3 }}>
            <ListItemIcon
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Ask">
                <IconButton
                  onClick={handleAsk}
                  sx={{
                    bgcolor: '#eae1f6',
                    p: 0,
                    '&:hover': {
                      bgcolor: '#d4c5e8',
                    },
                  }}
                >
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
    </>
  );
};

export default MiniLeftSideBar;
