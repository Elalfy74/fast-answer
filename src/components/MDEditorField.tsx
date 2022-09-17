import { Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const MDEditorField = ({ value, onChange }: any) => {
  return (
    <Box data-color-mode="light" width="100%" mt={4}>
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        textareaProps={{
          placeholder: 'What are your thoughts ?',
        }}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </Box>
  );
};
export default MDEditorField;
