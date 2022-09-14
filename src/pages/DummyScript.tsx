import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
// import { users } from "../data/user";
import { questions } from '../data/questions';
import { saveQuestion } from '../services/questions';
import { getAllTagsId, saveTag } from '../services/tags';
// import { tags } from "../data/tags";
import { getAllUsersIds, saveUserData } from '../services/users';

function DummyScript() {
  const { signup } = useAuth();

  const i = 0;

  // Add User

  // useEffect(() => {
  //   const saveUsers = async (num: number) => {
  //     const user = await signup(users[num].Email, users[num].PasswordHash);
  //     const id = user.user.uid;

  //     saveUserData(id, users[num]);
  //   };
  //   setInterval(() => {
  //     console.log(i);
  //     if (i < 50) {
  //       saveUsers(i);
  //       i += 1;
  //     }
  //   }, 2000);
  // }, []);

  // Add Tags
  // useEffect(() => {
  //   const saveTagFunc = async (num: number) => {
  //     saveTag(tags[num]);
  //   };
  //   setInterval(() => {
  //     console.log(i);
  //     if (i < 50) {
  //       saveTagFunc(i);
  //       i += 1;
  //     }
  //   }, 2000);
  // }, []);

  // Add Questions
  // 1- Get All Users ID
  // 2. Gel All Tags ID

  // 3- Assign random User Id
  // 4- assign random tags

  // Save the  questions

  // function generateRandomNumber(max: number, startfromZero: boolean) {
  //   if (startfromZero) {
  //     return Math.floor(Math.random() * max);
  //   } else {
  //     return Math.floor(Math.random() * max) + 1;
  //   }
  // }
  // useEffect(() => {
  //   const saveQuestionFunc = async (i: number) => {
  //     //1;
  //     const users = await getAllUsersIds();

  //     //2
  //     const tags = await getAllTagsId();

  //     //3- Assign random User Id
  //     const userId = users[generateRandomNumber(50, true)];

  //     // 4- genrate random tags number
  //     const tagsNumber = generateRandomNumber(5, false);
  //     const tagsIdsNumbers: any = [];

  //     // 5- assign random tags
  //     let tagIdNumber = generateRandomNumber(50, true);
  //     while (tagsIdsNumbers.length < tagsNumber) {
  //       if (!tagsIdsNumbers.includes(tagIdNumber)) {
  //         tagsIdsNumbers.push(tagIdNumber);
  //       }
  //       tagIdNumber = generateRandomNumber(50, true);
  //     }
  //     const tagsIds: any = tagsIdsNumbers.map((taggg: number) => tags[taggg]);

  //     const question = questions[i];
  //     // 6- save the question
  //     saveQuestion(userId, question, tagsIds);
  //   };

  //   setInterval(() => {
  //     console.log(i);
  //     if (i < 50) {
  //       saveQuestionFunc(i);
  //       i += 1;
  //     }
  //   }, 2000);
  // }, []);
  return <div>DummyScript</div>;
}

export default DummyScript;
function getAllUser() {
  throw new Error('Function not implemented.');
}
