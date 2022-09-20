import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import MDEditorField from '../../components/MDEditorField';
import { useAuth } from '../../contexts/AuthContext';
import { Tag } from '../../data/types';
import { saveQuestion } from '../../services/questions';
import { getTagsByQuery } from '../../services/tags';
import { MarginBox, SecondHeader, Title } from './CustomComponents';

const AskQuestion = () => {
  const [bodyValue, setBodyValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [tagsValue, setTagsValue] = useState<Tag[]>([]);
  const [queryText, setQueryText] = useState('');

  const [questionFormIsValid, setQuestionFormIsValid] = useState(true);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const { data, refetch } = useQuery('tags', () => getTagsByQuery(queryText), {
    enabled: false,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (queryText.length > 0) {
        refetch();
      }
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [queryText, refetch]);

  const { mutate, isLoading, error } = useMutation(saveQuestion, {
    onSuccess: () => {
      navigate('/');
    },
  });

  const validateForm =
    bodyValue.length > 0 && titleValue.length > 0 && tagsValue.length !== 0;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const handleTagsChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: Tag[]
  ) => {
    setTagsValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!validateForm) {
      setQuestionFormIsValid(validateForm);
      return;
    }
    mutate({
      authorId: currentUser.uid,
      title: titleValue,
      body: bodyValue,
      tags: tagsValue,
    });
  };
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', pt: 6 }}>
      <Typography
        variant="h4"
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        Ask a question
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          my: 5,
        }}
      >
        <MarginBox>
          <SecondHeader>Question</SecondHeader>
          <Title>
            Be specific and imagine you’re asking a question to another person
          </Title>
          <TextField
            sx={{ pb: '2px' }}
            size="small"
            fullWidth
            value={titleValue}
            onChange={handleTitleChange}
            autoFocus
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
          <Typography color="text.secondary" variant="caption" px="2px">
            character limit: 0/100
          </Typography>
        </MarginBox>
        <MarginBox>
          <SecondHeader>Details</SecondHeader>
          <Title>
            Include all the information someone would need to answer your
            question
          </Title>
          <MDEditorField value={bodyValue} onChange={setBodyValue} />
        </MarginBox>
        <MarginBox>
          <SecondHeader>Tags</SecondHeader>
          <Title>
            Add up to 5 tags to describe what your question is about
          </Title>
          <Autocomplete
            onChange={handleTagsChange}
            multiple
            size="small"
            id="tags-standard"
            options={(data as Tag[]) || []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setQueryText(e.target.value)}
                {...params}
                variant="outlined"
                placeholder="add tags"
              />
            )}
          />
        </MarginBox>
        {!questionFormIsValid && (
          <Typography
            sx={{
              fontSize: '14px',
              padding: '0 2px',
              mt: '2px',
              mb: '4px',
              color: 'red',
            }}
          >
            Title, Question and tags can not be empty.
          </Typography>
        )}
        <Box sx={{ mt: 2, mb: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{
              maxHeight: 45,
              alignSelf: 'flex-start',
              fontSize: '14px',
            }}
          >
            Post your question
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default AskQuestion;
