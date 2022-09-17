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
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionType } from '../../data/types';

type QuestionProps = {
  question: QuestionType;
};
function Question({ question }: QuestionProps) {
  return (
    <Card variant="outlined" sx={{ width: '100%', minHeight: '163px' }}>
      <CardContent>
        {/* Start Question Info */}
        <Stack direction="row" justifyContent="space-between" gap={2}>
          {/* Start Question Title and body */}
          <Box overflow="hidden">
            <Link to={`questions/${question.id}`}>
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
              {/* Up Votes */}
              <Box display="flex" alignItems="center" color="#151515">
                <Typography sx={{ mr: 0.5 }} component="span">
                  {question.upVotes}
                </Typography>
                <ArrowUpward fontSize="small" />
              </Box>
              {/* Down Votes */}
              <Box display="flex" alignItems="center" color="#F24E1E">
                <Typography sx={{ mr: 0.5 }}> {question.downVotes}</Typography>
                <ArrowDownward fontSize="small" />
              </Box>
            </Stack>
            {/* Answers */}
            <Box mb={1} display="flex" alignItems="center" color="#0FA958">
              <Typography sx={{ mr: 0.5 }}>13</Typography>
              <Forum fontSize="small" />
            </Box>
            {/* Views */}
            <Box display="flex" alignItems="center" color="#E4A951">
              <Typography sx={{ mr: 0.5 }}>13</Typography>
              <Visibility fontSize="small" />
            </Box>
          </Box>
          {/* End of UpVotes */}
        </Stack>
        {/* End Question Info */}

        {/* Start of Tags And User Display */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            alignItems: 'flex-end',
          }}
        >
          {/* User and Datetime */}
          <Box sx={{ display: 'flex', gap: 0.7, alignItems: 'center' }}>
            <Avatar
              alt="user avatar"
              src={question.author.PhotoUrl}
              sx={{ width: 35, height: 35 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: '500',
                  fontSize: {
                    xs: 12,
                    sm: 'inherit',
                  },
                }}
                color="#6AA5FF"
              >
                {question.author.FirstName}{' '}
                {question.author.LastName && question.author.LastName}
              </Typography>
              <Typography
                variant="caption"
                color="gray"
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 'default',
                  },
                }}
              >
                asked {question.creationTime}
              </Typography>
            </Box>
          </Box>

          {/* Tags */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              gap: 1,
              flex: 1,
            }}
          >
            {question.tags.map((tag) => (
              <Typography
                key={tag.id}
                component="span"
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
            ))}
          </Box>
        </Box>
        {/* End of Tags And User Display */}
      </CardContent>
    </Card>
  );
}
export default React.memo(Question);
