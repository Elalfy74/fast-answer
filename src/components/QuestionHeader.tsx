import { Typography, Button, Box } from '@mui/material';

const title = 'All Questions';

function QuestionHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        pl: 2,
        pr: 2,
        mb: 4,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Button variant="contained" color="primary" size="medium">
        Ask question
      </Button>
    </Box>
  );
}

export default QuestionHeader;
