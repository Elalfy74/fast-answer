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
  updateDoc,
} from 'firebase/firestore';
import PQueue from 'p-queue';

import { User } from '../data/types';
import { db } from '../firebase-config';
import { getLastThreeDaysAnswers } from './answers';

const queue = new PQueue({ concurrency: 1 });

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

export const getUserById = async (id: string) => {
  const userRef = doc(db, 'users', id);

  const userData = await getUserByRef(userRef);

  return userData;
};

export const saveUserData = async (user: {
  id: string;
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
  await setDoc(doc(usersCollectionRef, user.id), newUser);
};

export const updateUserData = async (user: any) => {
  const newUserData = { ...user };
  delete newUserData.Email;

  const userRef = doc(db, 'users', user.id);
  const updateResult = await updateDoc(userRef, newUserData);

  return updateResult;
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
