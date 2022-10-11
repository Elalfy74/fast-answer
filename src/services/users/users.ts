import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import PQueue from 'p-queue';

import { User } from '../../data/global.types';
import { db } from '../../firebase-config';
import { getLastThreeDaysAnswers } from '../answers/answers';
import {
  SaveUserDataParams,
  UpdateUserAvatarParams,
  UpdateUserDetailsParams,
} from './users.type';

const queue = new PQueue({ concurrency: 1 });

const usersCollectionRef = collection(db, 'users');

// *********** APIS ***********
// GET
export const getUserByRef = async (
  userRef: DocumentReference<DocumentData>
) => {
  const userDoc = await getDoc(userRef);

  return { ...userDoc.data(), id: userDoc.id } as User;
};

// GET
export const getUserById = async (id: string) => {
  const userRef = doc(db, 'users', id);

  const userData = await getUserByRef(userRef);

  return userData;
};

// GET
export const getTopUsers = async () => {
  const asnwersOfLastThreeDays = await getLastThreeDaysAnswers();

  if (asnwersOfLastThreeDays.length === 0) {
    return [];
  }
  const countsOfUsers: {
    [key: string]: number;
  } = {};

  asnwersOfLastThreeDays.forEach((answer) => {
    if (answer.author) {
      countsOfUsers[answer.author.id] = countsOfUsers[answer.author.id]
        ? countsOfUsers[answer.author.id] + 1
        : 1;
    }
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

// POST
export const saveUserData = async (
  userId: string,
  user: SaveUserDataParams
) => {
  const newUser = {
    ...user,
    userName: user.firstName + user.lastName,
  };

  await setDoc(doc(usersCollectionRef, userId), newUser);
};

// UPDATE
export const updateUserData = async (
  user: UpdateUserAvatarParams | UpdateUserDetailsParams
) => {
  const userRef = doc(db, 'users', user.id);
  const updateResult = await updateDoc(userRef, user);

  return updateResult;
};
