import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const usersCollectionRef = collection(db, "users");

export const saveUserData = async (userId: string, user: any) => {
  delete user.PasswordHash;
  await setDoc(doc(usersCollectionRef, userId), user);
};

export const getAllUsersIds = async () => {
  const users = await getDocs(usersCollectionRef);

  return users.docs.map((doc) => doc.id);
};
