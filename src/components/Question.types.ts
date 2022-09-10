export type QuestionType = {
  question: {
    question_id: number;
    question_title: string;
    question_body: string;
    creation_time: string;
    owner: {
      user_first_name: string;
      avatar?: string;
    };
    tags: {
      tag_id: number;
      tag_name: string;
    }[];
  };
};
