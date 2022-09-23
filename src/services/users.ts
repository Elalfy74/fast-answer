import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import { User } from '../data/types';
import { db } from '../firebase-config';
import { queue } from '../utils/queue';
import { getLastThreeDaysAnswers } from './answers';

const usersCollectionRef = collection(db, 'users');

// export const saveUserData = async (userId: string, user: any) => {
//   // eslint-disable-next-line no-param-reassign
//   delete user.PasswordHash;
//   await setDoc(doc(usersCollectionRef, userId), user);
// };

export const getAllUsersIds = async () => {
  const users = await getDocs(usersCollectionRef);

  return users.docs.map((userDoc) => userDoc.id);
};

export const getUserByRef = async (
  userRef: DocumentReference<DocumentData>
) => {
  const userDoc = await getDoc(userRef);

  return { ...userDoc.data(), id: userDoc.id } as User;
};

export const saveUserData = async (user: {
  userId: string;
  Email: string;
  FirstName: string;
  LastName?: string;
}) => {
  const newUser = {
    ...user,
    UserName: null,
    LastName: user.LastName || null,
    Bio: null,
    UniversityLevel: null,
    PhotoUrl: null,
    College: null,
    Major: null,
    Birthdate: null,
    PhoneNumber: null,
  };
  await setDoc(doc(usersCollectionRef, user.userId), newUser);
};

export const getTopUsers = async () => {
  const asnwersOfLastThreeDays = await getLastThreeDaysAnswers();

  if (asnwersOfLastThreeDays.length === 0) {
    return [];
  }
  const countsOfUsers: {
    [key: string]: number;
  } = {};

  asnwersOfLastThreeDays.forEach((answer) => {
    countsOfUsers[answer.author.id] = countsOfUsers[answer.author.id]
      ? countsOfUsers[answer.author.id] + 1
      : 1;
  });

  const sortedUsers = Object.keys(countsOfUsers).sort(
    (a, b) => countsOfUsers[b] - countsOfUsers[a]
  );

  sortedUsers.splice(3);

  const topUsersData = await queue.addAll(
    sortedUsers.map((userId) => {
      return async () => {
        const user = await getUserByRef(doc(db, 'users', userId));
        return { ...user, answersCount: countsOfUsers[userId] };
      };
    })
  );

  return topUsersData;
};
