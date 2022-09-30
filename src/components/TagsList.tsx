import { List } from '@mui/material';

import { Tag } from '../data/global.types';
import { TagItem } from '.';

type TagsListProps = {
  tags: Tag[];
  align?: boolean;
};

const TagsList = ({ tags, align }: TagsListProps) => {
  return (
    <List
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        flex: align ? '1' : '',
        justifyContent: align ? 'flex-end' : 'flex-start',
      }}
    >
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </List>
  );
};

export default TagsList;
