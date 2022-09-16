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
        {LeftSideBarList.map((item) => (
          <ListItem
            key={item.label}
            sx={{ px: { xs: 0, xl: '16px' }, mb: '10px' }}
          >
            <Button
              color="info"
              component="div"
              variant="text"
              sx={{
                borderRadius: '20px',
                px: 2,
                display: { xs: 'none', xl: 'flex' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  mr: 1,
                  color: 'primary.main',
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
