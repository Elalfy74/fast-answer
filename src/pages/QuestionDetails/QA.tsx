import { Avatar, Box, Stack, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeBlock = {
  code({ children, className }: any) {
    let language = 'jsx';
    if (className) {
      // eslint-disable-next-line prefer-destructuring
      language = className.split('-')[1];
    }

    return (
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        style={coy}
        PreTag="span"
        language={language}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

type QAProps = {
  authorFirstName?: string;
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
        <Avatar src={authorAvatar} />
        <Stack>
          <Typography component="h6" variant="body1" fontWeight="500">
            {authorFirstName
              ? `${authorFirstName} ${authorLastName || ''}`
              : 'Anonymous'}
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
