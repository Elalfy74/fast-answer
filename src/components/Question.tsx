// Start MUI Components
import { Link } from "react-router-dom";
import { QuestionType, Tag } from "./Question.types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Forum,
  Visibility,
} from "@mui/icons-material";

type QuestionProps = {
  question: QuestionType;
};
const Question = ({ question }: QuestionProps) => {
  console.log(question.tags);
  return (
    <Card variant="outlined" sx={{ width: "100%", minHeight: "163px" }}>
      {/* <Box sx={{ display: "flex", p: "12px" }}> */}
      {/* <Avatar
          alt="user avatar"
          src={
            question.owner.avatar ||
            "https://www.pinclipart.com/picdir/big/547-5474602_character-avatar-clipart.png"
          }
          sx={{ width: 45, height: 45, mr: "5px" }}
        /> */}
      {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ fontWeight: "600", mb: 0 }}
          >
            {question.owner.user_first_name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0, mt: 0 }}
          >
            {question.creation_time}
          </Typography>
        </Box> */}
      {/* </Box> */}
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          {/*Start Question Title and body */}
          <Box overflow="hidden">
            <Link to={`${question.id}`}>
              <Typography
                component="h3"
                color="secondary.main"
                variant="h6"
                gutterBottom
                sx={{
                  transition: "all 0.2s ",
                  "&:hover": {
                    color: "secondary.100",
                  },
                }}
              >
                {question.title}
              </Typography>
            </Link>
            <Typography noWrap variant="body2">
              {question.body}
            </Typography>
          </Box>
          {/*End Question Title and body */}
          {/*Start  UpVotes and other */}
          {/*TODO edit upvotes Styling*/}
          <Box>
            <Stack direction="row" mb={1}>
              <Box display="flex" alignItems="center" color="success.main">
                <Typography component="span">{"13"}</Typography>
                <ArrowUpward fontSize="small" />
              </Box>
              <Box display="flex" alignItems="center" color="error.main">
                <Typography>{"13"}</Typography>
                <ArrowDownward fontSize="small" />
              </Box>
            </Stack>

            <Box mb={1} display="flex" alignItems="center" color="info.main">
              <Typography>{"13"}</Typography>
              <Forum fontSize="small" />
            </Box>

            <Box display="flex" alignItems="center" color="warning.light">
              <Typography>{"13"}</Typography>
              <Visibility fontSize="small" />
            </Box>
          </Box>
          {/*End of UpVotes */}
        </Stack>

        {/*Start of Tags And User Display*/}
        {/*TODO ADD  User Display Here  */}
        <Stack direction="row">
          {question.tags.map((tag: Tag) => (
            <Box key={tag.id} sx={{ mt: 1, mr: 2 }}>
              <Typography
                component="span"
                sx={{
                  p: "1px 6px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  bgcolor: "hsl(205deg 46% 92%)",
                  color: "hsl(205deg 47% 42%)",
                }}
              >
                {tag.name}
              </Typography>
            </Box>
          ))}
        </Stack>
        {/*End of Tags And User Display*/}
      </CardContent>
    </Card>
  );
};
export default Question;
