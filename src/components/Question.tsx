import React from "react";
import { Link } from "react-router-dom";
import avatar from '../assets/avatar.jpg';
import { QuestionType, Tag } from "./Question.types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Forum,
  Visibility,
} from "@mui/icons-material";

type QuestionProps = {
  question: QuestionType;
};
const Question = ({ question }: QuestionProps) => {
  console.log(question);
  return (
    <Card variant="outlined" sx={{ width: "100%", minHeight: "163px" }}>
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
        {/*Start Question Info */}
        <Stack direction="row" justifyContent="space-between">
          {/*Start Question Title and body */}
          <Box sx={{ mb: 1, ml: 1, overflow: 'hidden'}}>
            <Link to={`${question.id}`}>
              <Typography
                component="h3"
                color="#3B6893"
                variant="h6"
                sx={{
                  transition: "all 0.2s ",
                  "&:hover": {
                    color: "secondary.100",
                  },
                }}
              >
                {question.title}
              </Typography>
            </Link>
            <Typography noWrap variant="body2" color="#989898">
              {question.body}
            </Typography>
          </Box>
          {/*End Question Title and body */}
          {/*Start  UpVotes and other */}
          {/*TODO edit up votes Styling*/}
          <Box>
            <Stack direction="row" spacing={1} mb={1} >
              <Box display="flex" alignItems="center" color="#151515">
                <Typography sx={{ mr: 0.5 }} component="span">{"13"}</Typography>
                <ArrowUpward fontSize="small" />
              </Box>
              <Box display="flex" alignItems="center" color="#F24E1E">
                <Typography sx={{ mr: 0.5 }}>{"13"}</Typography>
                <ArrowDownward fontSize="small" />
              </Box>
            </Stack>

            <Box mb={1} display="flex" alignItems="center" color="success.400">
              <Typography sx={{ mr: 0.5 }}>{"13"}</Typography>
              <Forum fontSize="small" />
            </Box>

            <Box display="flex" alignItems="center" color="#E4A951">
              <Typography sx={{ mr: 0.5 }}>{"13"}</Typography>
              <Visibility fontSize="small" />
            </Box>
          </Box>
          {/*End of UpVotes */}
        </Stack>

        {/*Start of Tags And User Display*/}    
        <Box display='flex' justifyContent='space-between' sx={{ ml: 1 }} >

          {/* User and Datetime */}
          <Box sx={{ display: 'flex', gap: 0.7, flexWrap: 'wrap' }} >
            <Box sx={{borderRadius: '50%'}}>
              <img src={avatar} alt="user avatar" width="25px" height="25px"/>
            </Box>
            {/* <Typography color="#6AA5FF">{question.author.authorName}</Typography> */}
            <Typography color="#6AA5FF">Mahmoud Ramadan</Typography>
            {/* <Typography>asked</Typography>
            <Typography color='#616161' variant="caption" sx={{mt: 0.5}}>{question.creationTime}</Typography> */}
            <Typography color='#616161' variant="caption" sx={{mt: 0.5}}>1 min ago</Typography>
          </Box>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {question.tags.map((tag) => (
              <Box key={tag.id} sx={{ mr: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    p: "1px 6px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    bgcolor: "hsl(205deg 46% 92%)",
                    color: "hsl(205deg 47% 42%)",
                  }}
                >
                  {tag.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/*End of Tags And User Display*/}
      </CardContent>
    </Card>
  );
};
export default React.memo(Question);
