import { Typography } from '@mui/material';

import { Tag } from '../data/global.types';

type TagItemProps = {
  tag: Tag;
};

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Typography
      component="li"
      key={tag.id}
      sx={{
        p: '1px 3px',
        fontSize: '13px',
        borderRadius: '4px',
        bgcolor: 'hsl(205deg 46% 92%)',
        color: 'hsl(205deg 47% 42%)',
      }}
    >
      {tag.name}
    </Typography>
  );
};

export default TagItem;
