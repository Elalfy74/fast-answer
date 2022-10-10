import { Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '.';

const MDEditorField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) => {
  return (
    <Box width="100%" mt={4}>
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        textareaProps={{
          placeholder: 'What are your thoughts ?',
        }}
      />
      <ReactMarkdown components={CodeBlock}>{value}</ReactMarkdown>
    </Box>
  );
};
export default MDEditorField;
