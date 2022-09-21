import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { User } from '../data/types';
import { db } from '../firebase-config';
import { getUserByRef } from '../services/users';
import { useAuth } from './AuthContext';

// type Message = {
//   body: string;
//   chat: DocumentReference<DocumentData>;
//   creationTime: Timestamp;
//   sender: DocumentReference<DocumentData>;
// };

type ReceviedChat = {
  id: string;
  users: DocumentReference<DocumentData>[];
};

export type FormatedChat = ReceviedChat & {
  otherUser: User;
};

type Context = {
  chats: FormatedChat[] | null;
  loading: boolean;
};

const ChatContext = createContext<Context>({} as Context);

export function useChat() {
  return useContext(ChatContext);
}

type ChatProviderProps = {
  children: React.ReactNode;
};
const ChatProvider = ({ children }: ChatProviderProps) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<FormatedChat[] | null>(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const formatAndSaveChats = async (chatResult: ReceviedChat[]) => {
      if (currentUser) {
        const formatedChat: FormatedChat[] = [];
        for (let i = 0; i < chatResult.length; i++) {
          const otherUser = chatResult[i].users.find(
            (chatUser) => chatUser.id !== currentUser.uid
          );
          if (otherUser) {
            const otherUserData = await getUserByRef(otherUser);
            // console.log(otherUserData);
            formatedChat.push({
              ...chatResult[i],
              otherUser: otherUserData,
            });
          }
        }

        setChats(formatedChat);
        setLoading(false);
      }
    };

    if (currentUser) {
      const user = doc(db, 'users', currentUser.uid);

      const q = query(
        collection(db, 'chat'),
        where('users', 'array-contains', user)
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        const chatResult: ReceviedChat[] = [];

        querySnapshot.forEach((chatDoc) => {
          chatResult.push({
            id: chatDoc.id,
            ...chatDoc.data(),
          } as ReceviedChat);
        });

        if (chatResult.length) {
          formatAndSaveChats(chatResult);
        }
      });
      return unsub;
    }
  }, [currentUser]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    loading,
    chats,
  };

  return (
    <ChatContext.Provider value={value}>
      {!loading && children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
