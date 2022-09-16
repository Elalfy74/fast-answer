import { Box, Divider } from '@mui/material';

import { QA, Votes } from '.';

const Answer = () => {
  return (
    <Box width="100%" py={3}>
      <Divider
        light
        sx={{
          mb: 4,
        }}
      />
      <QA
        authorFirstName="Mahmoud"
        authorLastName="Elalfy"
        body="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit consectetur neque facilis itaque deserunt rem, dicta quod asperiores suscipit accusantium esse officiis ratione non a quis sint error odio nostrum."
        creationTime="2 hours ago"
      />
      <Votes upVotes={13} downVotes={10} />
    </Box>
  );
};

export default Answer;
