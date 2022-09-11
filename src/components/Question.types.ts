export type QuestionType = {
  id: string;
  title: string;
  body: string;
  creationTime: string;
  author: {
    authorId: string;
    authorName: string;
    avatar?: string;
  };
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};
