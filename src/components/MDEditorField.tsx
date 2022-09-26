import 'react-mde/lib/styles/css/react-mde-all.css';

import { Box } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import { CodeBlock } from '../pages/QuestionDetails/QA';

const MDEditorField = ({ value, onChange }: any) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );

  return (
    <Box width="100%" mt={4}>
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
      />
      <ReactMarkdown components={CodeBlock}>{value}</ReactMarkdown>
    </Box>
  );
};
export default MDEditorField;
