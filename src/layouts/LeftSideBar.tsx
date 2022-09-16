import {
  Bookmark,
  Feed,
  Leaderboard,
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

import { Logo } from '../components';

const LeftSideBarList = [
  {
    label: 'Home',
    icon: <Feed />,
  },
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
    label: 'Leaderboard',
    icon: <Leaderboard />,
  },
  {
    label: 'My Account',
    icon: <Person />,
  },
];

function LeftSideBar() {
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LeftSideBar;
