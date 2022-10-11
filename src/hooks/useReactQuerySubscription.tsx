import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { useAuth } from '../contexts/AuthContext';
import { User } from '../data/global.types';
import { db } from '../firebase-config';
import { ReceviveMessage } from '../pages/Chat/ChatDetails.types';

type ChatDetailsProps = {
  otherUser: User;
  chatId: string;
};

// This Hook is Used To Listen to real Time Messages and changing the query value
export const useReactQuerySubscription = ({
  otherUser,
  chatId,
}: ChatDetailsProps) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentUser) {
      const chatRef = doc(db, 'chat', chatId!);

      const q = query(
        collection(db, 'messages'),
        where('chat', '==', chatRef),
        orderBy('creationTime')
      );

      const unsub = onSnapshot(q, (querySnapshot) => {
        const receviveMesssages: ReceviveMessage[] = [];

        querySnapshot.forEach((messageDoc) => {
          receviveMesssages.push({
            id: messageDoc.id,
            ...messageDoc.data(),
            senderData: otherUser,
          } as ReceviveMessage);
        });

        queryClient.setQueryData(['messages', chatId], receviveMesssages);
      });
      return unsub;
    }
  }, [currentUser, chatId, otherUser, queryClient]);
};
