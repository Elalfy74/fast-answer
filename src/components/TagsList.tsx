import { List } from '@mui/material';

import { Tag } from '../data/types';
import { TagItem } from '.';

type TagsListProps = {
  tags: Tag[];
};

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <List
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'flex-end',
      }}
    >
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </List>
  );
};

export default TagsList;
