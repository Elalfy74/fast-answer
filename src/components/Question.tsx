// Start MUI Components
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface Question {
  question: {
    question_id: number;
    question_title: string;
    question_body: string;
    creation_time: string;
    owner: {
      user_first_name: string;
      avatar?: string;
    };
    tags: {
      tag_id: number;
      tag_name: string;
    }[];
  };
}

const Question: React.FC<Question> = ({ question }) => {
  return (
    <Card sx={{ width: "100%", mb: 1 }}>
      <Box sx={{ display: "flex", p: "12px" }}>
        <Avatar
          alt="user avatar"
          src={
            question.owner.avatar ||
            "https://www.pinclipart.com/picdir/big/547-5474602_character-avatar-clipart.png"
          }
          sx={{ width: 45, height: 45, mr: "5px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        </Box>
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Link to={`${question.question_id}`}>
          <Typography
            component="h3"
            sx={{
              color: "hsl(206deg 100% 40%)",
              fontSize: "1.3rem",
              mb: 0.5,
              "&:hover": {
                color: "hsl(206,100%,52%)",
              },
            }}
          >
            {question.question_title || "This is Title"}
          </Typography>
        </Link>
        <Typography noWrap variant="body2">
          {question.question_body}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {question.tags.map((tag) => (
            <Box key={tag.tag_id} sx={{ mt: 1, mr: 2 }}>
              <Typography
                sx={{
                  p: "1px 6px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  width: "auto",
                  bgcolor: "hsl(205deg 46% 92%)",
                  color: "hsl(205deg 47% 42%)",
                }}
              >
                {tag.tag_name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
export default Question;
