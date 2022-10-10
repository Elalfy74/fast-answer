import { Avatar, Box, Stack, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '../../components';

type QAProps = {
  authorUserName?: string;
  authorAvatar?: string;
  body: string;
  creationTime: string;
};

const QA = ({ authorUserName, authorAvatar, creationTime, body }: QAProps) => {
  return (
    <Box>
      {/* Author display */}
      <Stack direction="row" alignItems="center" gap={1} mb={3}>
        <Avatar src={authorAvatar} />
        <Stack>
          <Typography component="h6" variant="body1" fontWeight="500">
            {authorUserName || 'Anonymous'}
          </Typography>
          <Typography variant="body2" color="gray">
            {creationTime}
          </Typography>
        </Stack>
        {/* End Author display */}
      </Stack>
      <ReactMarkdown components={CodeBlock} className="md-preview">
        {body}
      </ReactMarkdown>
    </Box>
  );
};

export default QA;
