import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { Tag } from '../data/global.types';
import { db } from '../firebase-config';

const tagsCollectionRef = collection(db, 'tags');

export const saveTag = async (tag: { name: string }) => {
  await addDoc(tagsCollectionRef, tag);
};

// get All Tags of Question API
export const getTags = async (tagsRef: DocumentReference<DocumentData>[]) => {
  const tags: Tag[] = [];
  const tagsIds = tagsRef.map((tag) => tag.id);

  const tagsQuery = query(tagsCollectionRef, where('__name__', 'in', tagsIds));

  const tagsFromServer = await getDocs(tagsQuery);

  tagsFromServer.docs.forEach((tag) => {
    tags.push({
      ...tag.data(),
      id: tag.id,
    } as Tag);
  });

  return tags;
};

// get Tags By Query API
export const getTagsByQuery = async (queryText: string) => {
  const tagsQuery = query(
    tagsCollectionRef,
    where('name', '>=', queryText),
    // eslint-disable-next-line prefer-template
    where('name', '<=', queryText + '\uf8ff')
  );

  const tagsFromServer = await getDocs(tagsQuery);

  const tags = tagsFromServer.docs.map((tag) => {
    return {
      ...tag.data(),
      id: tag.id,
    };
  });

  return tags;
};
