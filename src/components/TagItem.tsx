import { SxProps, Theme, Typography } from '@mui/material';

import { Tag } from '../data/global.types';

const style: SxProps<Theme> = {
  p: '1px 3px',
  fontSize: '13px',
  borderRadius: '4px',
  bgcolor: 'hsl(205deg 46% 92%)',
  color: 'hsl(205deg 47% 42%)',
};

type TagItemProps = {
  tag: Tag;
};
const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Typography component="li" key={tag.id} sx={style}>
      {tag.name}
    </Typography>
  );
};

export default TagItem;
