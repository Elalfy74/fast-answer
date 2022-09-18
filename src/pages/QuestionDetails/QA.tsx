import { Avatar, Box, Stack, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

type QAProps = {
  authorFirstName: string;
  authorLastName?: string;
  authorAvatar?: string;
  body: string;
  creationTime: string;
};
const QA = ({
  authorFirstName,
  authorLastName,
  authorAvatar,
  creationTime,
  body,
}: QAProps) => {
  return (
    <Box>
      {/* Author display */}
      <Stack direction="row" alignItems="center" gap={1} mb={3}>
        <Avatar src={authorAvatar || undefined} />
        <Stack>
          <Typography component="h6" variant="body1" fontWeight="500">
            {authorFirstName} {authorLastName && authorLastName}
          </Typography>
          <Typography variant="body2" color="gray">
            {creationTime}
          </Typography>
        </Stack>
        {/* End Author display */}
      </Stack>
      <Typography
        sx={{
          whiteSpace: 'pre-line',
          lineBreak: 'anywhere',
        }}
      >
        {body}
      </Typography>
      {/* <MDEditor.Markdown
        source={body}
        style={{
          whiteSpace: 'pre-wrap',
          backgroundColor: 'transparent',
          color: 'black',
        }}
      /> */}
    </Box>
  );
};

export default QA;
