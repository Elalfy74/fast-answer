/* eslint-disable @typescript-eslint/ban-types */
import { doc } from 'firebase/firestore';

import { answers } from '../data/answers';
import { questions as localQuestions } from '../data/questions';
import { tags as localTags } from '../data/tags';
import { users as localUsers } from '../data/user';
import { db } from '../firebase-config';
import { saveAnswer } from '../services/answers';
import { getAllQuestionsIds, saveQuestion } from '../services/questions';
import { getAllTagsId, saveTag } from '../services/tags';
import { getAllUsersIds, saveUserData } from '../services/users';

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

  let userOfVoteIdNumber = generateRandomNumber(50, true);

  while (usersIdsNumbers.length < userVotesNumber) {
    if (!usersIdsNumbers.includes(userOfVoteIdNumber)) {
      usersIdsNumbers.push(userOfVoteIdNumber);
    }
    userOfVoteIdNumber = generateRandomNumber(50, true);
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

// SCRIPT Add Tag
export const addTag = async (i: number) => {
  await saveTag(localTags[i]);
};

// SCRIPT Add Question
export const addQuestion = async (i: number) => {
  const question = localQuestions[i];
  // 1- Get All Users ID
  const usersIds = await getAllUsersIds();
  // 2. Gel All Tags ID
  const alltagsIds = await getAllTagsId();
  // 3- Assign random User Id
  const userId = usersIds[generateRandomNumber(50, true)];
  // 4- genrate random tags number
  const tagsNumber = generateRandomNumber(5, false);
  const tagsIdsNumbers: any = [];
  // 5- assign random tags not repated
  let tagIdNumber = generateRandomNumber(50, true);

  while (tagsIdsNumbers.length < tagsNumber) {
    if (!tagsIdsNumbers.includes(tagIdNumber)) {
      tagsIdsNumbers.push(tagIdNumber);
    }
    tagIdNumber = generateRandomNumber(50, true);
  }
  const tagsIds: any = tagsIdsNumbers.map((taggg: number) => alltagsIds[taggg]);

  // 6- generate Votes
  const votesArray = generateVotes(usersIds);

  await saveQuestion(userId, question, tagsIds, votesArray);
};
// SCRIPT Add Answer
export const addAnswer = async (i: number) => {
  // Get All Users IDs and questions IDs
  const users = await getAllUsersIds();
  const questionsIds = await getAllQuestionsIds();

  // 3- Assign random User Id and question Id
  const body = answers[i];
  const userId = users[generateRandomNumber(50, true)];
  const questionId = questionsIds[generateRandomNumber(50, true)];

  // Generate Votes
  const votesArray = generateVotes(users);

  saveAnswer(userId, questionId, body, votesArray);
};
