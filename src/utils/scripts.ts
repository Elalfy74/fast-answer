/* eslint-disable @typescript-eslint/ban-types */
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import { answers } from '../data/answers';
import { questions as localQuestions } from '../data/questions';
import { tags as localTags } from '../data/tags';
import { users as localUsers } from '../data/user';
import { db } from '../firebase-config';
import {
  getAllQuestionsIds,
  saveFakeQuestion,
  saveQuestion,
} from '../services/questions/questions';
import { saveTag } from '../services/tags';
import { saveUserData } from '../services/users/users';

const usersCollectionRef = collection(db, 'users');
const tagsCollectionRef = collection(db, 'tags');
const answersCollectionRef = collection(db, 'answers');

function generateRandomNumber(max: number, startfromZero: boolean) {
  if (startfromZero) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * max) + 1;
}

function generateVotes(users: any) {
  // votes number
  const userVotesNumber = generateRandomNumber(20, false);

  // users Id of Votes
  const usersIdsNumbers: any = [];

  let userOfVoteIdNumber = generateRandomNumber(40, true);

  while (usersIdsNumbers.length < userVotesNumber) {
    if (!usersIdsNumbers.includes(userOfVoteIdNumber)) {
      usersIdsNumbers.push(userOfVoteIdNumber);
    }
    userOfVoteIdNumber = generateRandomNumber(40, true);
  }

  const votesArray: any = usersIdsNumbers.map((voteUser: any) => {
    const vote = generateRandomNumber(2, true);
    return {
      author: doc(db, 'users', users[voteUser]),
      value: vote === 0 ? 'up' : 'down',
    };
  });
  return votesArray;
}

// SCRIPT Add User --> Disabled As I changed the firestore function
// export const addUser = async (signup: Function, i: number) => {
//   const user = await signup(users[i].Email, users[i].PasswordHash);
//   const id = user.user.uid;

//   saveUserData(id, users[i]);
// };

// Script Add User Data To firestore
// needs id from firebase authentication
export const saveFakeUserData = async (userId: any, user: any) => {
  // eslint-disable-next-line no-param-reassign
  delete user.password;
  // eslint-disable-next-line no-param-reassign
  delete user.id;
  await setDoc(doc(usersCollectionRef, userId), user);
};

// Script get all Users Id To assign them to questions, answers or vote
export const getAllUsersIds = async () => {
  const users = await getDocs(usersCollectionRef);

  return users.docs.map((userDoc) => userDoc.id);
};

// SCRIPT Add Tag
export const addTag = async (i: number) => {
  await saveTag(localTags[i]);
};

// Script get all Tags Ids
export const getAllTagsId = async () => {
  const tags = await getDocs(tagsCollectionRef);

  return tags.docs.map((tagDoc) => tagDoc.id);
};

// SCRIPT Add Question
export const addQuestion = async (
  i: number,
  usersIds: any,
  alltagsIds: any
) => {
  const question = localQuestions[i];

  // 1- Get All Users ID
  // const usersIds = await getAllUsersIds();
  // 2. Gel All Tags ID
  // const alltagsIds = await getAllTagsId();
  // 3- Assign random User Id
  const userId = usersIds[generateRandomNumber(40, true)];
  // 4- genrate random tags number
  const tagsNumber = generateRandomNumber(5, false);
  const tagsIdsNumbers: any = [];
  // 5- assign random tags not repated
  let tagIdNumber = generateRandomNumber(50, true);

  while (tagsIdsNumbers.length < tagsNumber) {
    if (!tagsIdsNumbers.includes(tagIdNumber)) {
      tagsIdsNumbers.push(tagIdNumber);
    }
    tagIdNumber = generateRandomNumber(40, true);
  }
  const tagsIds: any = tagsIdsNumbers.map((taggg: number) => alltagsIds[taggg]);

  // 6- generate Votes
  const votesArray = generateVotes(usersIds);

  await saveFakeQuestion(userId, question, tagsIds, votesArray);
};

export const saveAnswer = async ({
  authorId,
  questionId,
  body,
  votes,
}: any) => {
  const newAnswer = {
    creationTime: Timestamp.fromDate(new Date()),
    body,
    question: doc(db, 'questions', questionId),
    votes,
    author: doc(db, 'users', authorId),
  };

  await addDoc(answersCollectionRef, newAnswer);
};

// SCRIPT Add Answer
export const addAnswer = async (i: number, users: any, questionsIds: any) => {
  // Get All Users IDs and questions IDs

  // 3- Assign random User Id and question Id
  const body = answers[i];
  const userId = users[generateRandomNumber(40, true)];
  const questionId = questionsIds[generateRandomNumber(50, true)];

  // Generate Votes
  const votesArray = generateVotes(users);

  // saveAnswer(userId, questionId, body, votesArray);
  await saveAnswer({ authorId: userId, questionId, body, votes: votesArray });
};
