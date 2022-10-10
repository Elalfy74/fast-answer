import { Login, Logout } from '@mui/icons-material';
import {
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const AuthActions = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
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
    </>
  );
};

export const MiniAuthActions = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
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
    </>
  );
};

export default AuthActions;
