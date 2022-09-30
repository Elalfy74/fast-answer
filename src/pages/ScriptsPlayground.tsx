import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { users } from '../data/user';
import { getAllQuestionsIds } from '../services/questions';
import {
  addAnswer,
  addQuestion,
  addTag,
  getAllTagsId,
  getAllUsersIds,
} from '../utils/scripts';

let i = 0;
let allUsersIds: string[];
let alltags: string[];
let allQIds: string[];

function ScriptsPlayground() {
  const { signup } = useAuth();

  // Add Users

  // Add Tags

  // Add Questions
  // addQuestion(i);

  // Add Answers
  // addAnswer(i);

  // useEffect(() => {
  // const addUser = async () => {
  //   const savedUser = await signup({
  //     email: users[i].email,
  //     password: users[i].password,
  //   });

  //   await saveFakeUserData(savedUser.user.uid, users[i]);

  //   i++;
  // };
  useEffect(() => {
    const getAllUsersIdss = async () => {
      allUsersIds = await getAllUsersIds();
    };
    getAllUsersIdss();
  }, []);

  useEffect(() => {
    const getAllTagsIdss = async () => {
      alltags = await getAllTagsId();
    };

    getAllTagsIdss();
  }, []);

  useEffect(() => {
    const getAllQuestionsIdss = async () => {
      allQIds = await getAllQuestionsIds();
    };

    getAllQuestionsIdss();
  }, []);

  setInterval(() => {
    console.log(i);

    if (i <= 49) {
      if (allUsersIds && allQIds) {
        addAnswer(i, allUsersIds, allQIds);
        // addQuestion(i, allUsersIds, alltags);
        i++;
      }
    }
    // Here is the code that will be executed every second
  }, 1000);

  // return () => clearInterval(id);
  // }, [i, signup]);

  return <div>DummyScript</div>;
}

export default ScriptsPlayground;
