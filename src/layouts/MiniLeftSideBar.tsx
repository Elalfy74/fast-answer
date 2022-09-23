import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { Logo } from '../components';
import { LeftSideBarList } from './LeftSideBar';

const MiniLeftSideBar = () => {
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
              <ListItemIcon
                sx={{
                  width: '100%',
                  display: 'flex',
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
      </List>
    </Box>
  );
};

export default MiniLeftSideBar;
