import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { Tag } from '../components/Question.types';
import { db } from '../firebase-config';

const tagsCollectionRef = collection(db, 'tags');

export const saveTag = async (tag: { name: string }) => {
  await addDoc(tagsCollectionRef, tag);
};

export const getTags = async (tagsRef: DocumentReference<DocumentData>[]) => {
  const tags: Tag[] = [];

  for (let i = 0; i < tagsRef.length; i++) {
    const tagDoc = await getDoc(tagsRef[i]);
    tags.push({ ...tagDoc.data(), id: tagDoc.id } as Tag);
  }
  return tags;
};

export const getAllTagsId = async () => {
  const tags = await getDocs(tagsCollectionRef);

  return tags.docs.map((doc) => doc.id);
};
