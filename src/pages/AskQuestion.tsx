
import { Fragment, useState, useId, useEffect, SetStateAction } from "react";
import {
    Container,
    Typography,
    Autocomplete,
    TextField,
    Button,
    Box,
    CircularProgress
} from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';


const AskQuestion = () => {
    const [bodyValue, setBodyValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [tagsValue, setTagsValue] = useState("");
    const [questionFormIsValid, setQuestionFormIsValid] = useState(true);

    const handleBodyChange = (event: { target: { value: any; }; }) => {
        setBodyValue(event.target.value);
    };
    const handleTitleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTitleValue(event.target.value);
    };
    const handleTagsChange = (event: any, value: any) => {
        setTagsValue(value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const validateForm =
            bodyValue.length > 0 && titleValue.length > 0 && tagsValue !== "";
        setQuestionFormIsValid(validateForm);
        if (!validateForm) {
            return;
        }
    };

    return (
        <Fragment>
            <Container sx={{ display: "flex", flexDirection: "column", pt: 6 }}>
                <Typography variant="h5">Ask a question</Typography>
                <Box component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        width: "auto",
                        boxShadow: 3,
                        borderRadius: 2,
                        p: "16px",
                        mb: 5,
                        mt: 5,
                    }}>
                    <Box sx={{ width: "100%", mb: "24px" }}>
                        <Typography
                            sx={{ fontSize: "18px", fontWeight: "600", padding: "0 2px" }}
                        >
                            Question
                        </Typography>
                        <Typography
                            sx={{ fontSize: "14px", padding: "0 2px", mt: "2px", mb: "4px" }}
                        >
                            Be specific and imagine you’re asking a question to another person
                        </Typography>
                        <TextField
                            sx={{ pb: "2px" }}
                            size="small"
                            fullWidth
                            value={titleValue}
                            // ref={titleInputRef}
                            onChange={handleTitleChange}
                            autoFocus
                            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                        />
                        <Typography color='text.secondary' variant='caption'>character limit: 0/100</Typography>
                    </Box>
                    <Box sx={{ width: "100%", mb: "24px" }}>
                        <Typography
                            sx={{ fontSize: "18px", fontWeight: "600", padding: "0 2px" }}
                        >
                            Details
                        </Typography>
                        <Typography
                            sx={{ fontSize: "14px", padding: "0 2px", mt: "2px", mb: "4px" }}
                        >
                            Include all the information someone would need to answer your
                            question
                        </Typography>
                        <TextField
                            placeholder="Ask your Question"
                            multiline
                            fullWidth
                            rows={6}
                            value={bodyValue}
                            // ref={bodyInputRef}
                            onChange={handleBodyChange}
                        />
                    </Box>
                    <Box sx={{ width: "100%", mb: "24px" }}>
                        <Typography
                            sx={{ fontSize: "18px", fontWeight: "600", padding: "0 2px" }}
                        >
                            Tags
                        </Typography>
                        <Typography
                            sx={{ fontSize: "14px", padding: "0 2px", mt: "2px", mb: "4px" }}
                        >
                            Add up to 5 tags to describe what your question is about
                        </Typography>
                        <Autocomplete
                            onChange={handleTagsChange}
                            multiple
                            size="small"
                            id="tags-standard"
                            options={['js', 'react']}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="add tags"
                                />
                            )}
                        />
                    </Box>
                    {questionFormIsValid === false && (
                        <Typography
                            sx={{
                                fontSize: "14px",
                                padding: "0 2px",
                                mt: "2px",
                                mb: "4px",
                                color: "red",
                            }}
                        >
                            Title, Question and tags can't be empty
                        </Typography>
                    )}
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={true}
                            sx={{
                                maxHeight: 45,
                                alignSelf: "flex-start",
                                fontSize: "14px",
                            }}
                        >
                            Post your question
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}

export default AskQuestion;