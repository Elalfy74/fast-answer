import { Box, Button } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

const MDEditorField = () => {
  const [value, setValue] = useState<any>('');

  return (
    <Box data-color-mode="light" width="100%" mt={4}>
      <MDEditor
        value={value}
        onChange={setValue}
        preview="edit"
        textareaProps={{
          placeholder: 'What are your thoughts ?',
        }}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      <Button
        variant="contained"
        sx={{
          mt: 2,
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
export default MDEditorField;
