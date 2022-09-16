import { Avatar, Box, Stack, Typography } from '@mui/material';

type QAProps = {
  authorFirstName: string;
  authorLastName: string;
  // eslint-disable-next-line react/require-default-props
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
    <Box mb={2}>
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
        }}
      >
        {body}
      </Typography>
    </Box>
  );
};

export default QA;
