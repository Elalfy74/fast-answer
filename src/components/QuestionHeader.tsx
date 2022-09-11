import { Typography, Button, Box } from "@mui/material";
const title = "All Questions";

const QuestionHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        pl: 2,
        pr: 2,
        mb: 4,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <a>
        <Button variant="contained" color="primary" size="medium">
          Ask question
        </Button>
      </a>
    </Box>
  );
};

export default QuestionHeader;
