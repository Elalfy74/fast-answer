import { User } from '../../data/global.types';

export type GetAllMessagesParams = {
  chatId: string;
  otherUser: User;
};

export type SaveMessageParams = {
  body: string;
  chatId: string;
  userId: string;
};
