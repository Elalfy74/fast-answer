import {
  ArrowDownward,
  ArrowUpward,
  Forum,
  Visibility,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionType, Tag } from './Question.types';

type QuestionProps = {
  question: QuestionType;
};
function Question({ question }: QuestionProps) {
  console.log(question.authorId);
  return (
    <Card variant="outlined" sx={{ width: '100%', minHeight: '163px' }}>
      {/* <Box sx={{ display: "flex", p: "12px" }}> */}
      {/* <Avatar
          alt="user avatar"
          src={
            question.owner.avatar ||
            "https://www.pinclipart.com/picdir/big/547-5474602_character-avatar-clipart.png"
          }
          sx={{ width: 45, height: 45, mr: "5px" }}
        /> */}
      {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ fontWeight: "600", mb: 0 }}
          >
            {question.owner.user_first_name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0, mt: 0 }}
          >
            {question.creation_time}
          </Typography>
        </Box> */}
      {/* </Box> */}
      <CardContent>
        {/* Start Question Info */}
        <Stack direction="row" justifyContent="space-between">
          {/* Start Question Title and body */}
          <Box overflow="hidden">
            <Link to={`${question.id}`}>
              <Typography
                component="h3"
                color="secondary.main"
                variant="h6"
                gutterBottom
                sx={{
                  transition: 'all 0.2s ',
                  '&:hover': {
                    color: 'secondary.100',
                  },
                }}
              >
                {question.title}
              </Typography>
            </Link>
            <Typography noWrap variant="body2">
              {question.body}
            </Typography>
          </Box>
          {/* End Question Title and body */}
          {/* Start  UpVotes and other */}
          <Box>
            <Stack direction="row" spacing={1} mb={1}>
              <Box display="flex" alignItems="center" color="#151515">
                <Typography sx={{ mr: 0.5 }} component="span">
                  13
                </Typography>
                <ArrowUpward fontSize="small" />
              </Box>
              <Box display="flex" alignItems="center" color="#F24E1E">
                <Typography sx={{ mr: 0.5 }}>13</Typography>
                <ArrowDownward fontSize="small" />
              </Box>
            </Stack>

            <Box mb={1} display="flex" alignItems="center" color="#0FA958">
              <Typography sx={{ mr: 0.5 }}>13</Typography>
              <Forum fontSize="small" />
            </Box>

            <Box display="flex" alignItems="center" color="#E4A951">
              <Typography sx={{ mr: 0.5 }}>13</Typography>
              <Visibility fontSize="small" />
            </Box>
          </Box>
          {/* End of UpVotes */}
        </Stack>
        {/* End Question Info */}
        {/* Start of Tags And User Display */}
        {/* TODO ADD  User Display Here  */}
        <Stack direction="row">
          {question.tags.map((tag: Tag) => (
            <Box key={tag.id} sx={{ mt: 1, mr: 2 }}>
              <Typography
                component="span"
                sx={{
                  p: '1px 6px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  bgcolor: 'hsl(205deg 46% 92%)',
                  color: 'hsl(205deg 47% 42%)',
                }}
              >
                {tag.name}
              </Typography>
            </Box>
          ))}
        </Stack>
        {/* End of Tags And User Display */}
      </CardContent>
    </Card>
  );
}
export default React.memo(Question);
