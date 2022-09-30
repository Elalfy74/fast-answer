import {
  Bookmark,
  BookmarkBorderOutlined,
  Person,
  PersonOutlined,
  QuestionAnswer,
  QuestionAnswerOutlined,
  Tag,
  TagOutlined,
} from '@mui/icons-material';
import {
  BottomNavigationAction,
  Box,
  Paper,
  SxProps,
  Theme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const BottomList = [
  {
    label: 'Questions',
    activeIcon: <QuestionAnswer />,
    icon: <QuestionAnswerOutlined />,
    path: '/',
  },
  {
    label: 'Favourites',
    activeIcon: <Bookmark />,
    icon: <BookmarkBorderOutlined />,
    path: '/favorites',
  },
  {
    label: 'Tags',
    activeIcon: <Tag />,
    icon: <TagOutlined />,
    path: '/tags',
  },
  {
    label: 'Profile',
    activeIcon: <Person />,
    icon: <PersonOutlined />,
    path: '/user',
  },
];

const styles: { [key: string]: SxProps<Theme> } = {
  paperStyle: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    pb: 5,
    display: {
      sm: 'none',
    },
  },
  boxStyle: {
    display: 'flex',
    pt: 2,
    justifyContent: 'space-around',
  },
};

const BottomNavigationBar = () => {
  return (
    <Paper sx={styles.paperStyle} elevation={3}>
      <Box sx={styles.boxStyle}>
        {BottomList.map((link) => (
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
