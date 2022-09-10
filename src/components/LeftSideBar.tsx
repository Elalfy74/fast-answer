import { Logo } from "./";

import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

import {
  Feed,
  QuestionAnswer,
  Bookmark,
  Tag,
  Person,
  Leaderboard,
} from "@mui/icons-material";

const LeftSideBarList = [
  {
    label: "Home",
    icon: <Feed />,
  },
  {
    label: "Questions",
    icon: <QuestionAnswer />,
  },
  {
    label: "Faviourites",
    icon: <Bookmark />,
  },
  {
    label: "Tags",
    icon: <Tag />,
  },
  {
    label: "Leaderboard",
    icon: <Leaderboard />,
  },
  {
    label: "My Account",
    icon: <Person />,
  },
];
const LeftSideBar: React.FC = () => {
  return (
    <Box>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          borderRadius: "8px",
        }}
      >
        <ListItem>
          <Logo />
        </ListItem>
        {LeftSideBarList.map((item, index) => (
          <ListItem key={item.label}>
            <Tooltip title={item.label} open={false}>
              <ListItemIcon>
                <IconButton>{item.icon}</IconButton>
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftSideBar;
