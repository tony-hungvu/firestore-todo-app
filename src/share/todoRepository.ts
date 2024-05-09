import { DocumentData, Query, Timestamp } from 'firebase-admin/firestore';

import { ToDoes } from '../handlers/todoes.interface';
import { postRef } from './firestore.config';

const getAll = async ({ limit, sort }: any) => {
  // let query: Query<DocumentData> = postRef;

  // if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
  //   query = query.orderBy('createdAt', sort.toLowerCase());
  // }

  // if (!isNaN(parseInt(limit))) {
  //   query = query.limit(parseInt(limit));
  // }

  const querySnapshot = await postRef.get();
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return data;
};

const getById = async (id: string) => {
  const snapshot = await postRef.doc(id).get();
  if (!snapshot.exists) {
    console.error('Document does not exist');
    return null;
  }

  const toDoData = snapshot.data();
  const res = { id: snapshot.id, ...toDoData };

  return res;
};

const created = async (data: ToDoes) => {
  const currentTime: Timestamp = Timestamp.now();

  const dateObject: Date = currentTime.toDate();

  const formattedDate: string = dateObject.toISOString();
  const requestBody = {
    text: data.text,
    isCompleted: false,
    createdAt: formattedDate,
  };
  const docRef = await postRef.add(requestBody);
  console.log('Document successfully written with ID: ', docRef.id);
  return {
    id: docRef.id,
    ...requestBody,
  };
};

const deleted = async (id: string) => {
  await postRef.doc(id).delete();
  const todoDeteled = await getById(id);
  return todoDeteled;
};

const deletedList = async (ids: string[]) => {
  return Promise.all(
    ids.map(async (id) => {
      return await deleted(id);
    })
  );
};

const updated = async (id: string) => {
  await postRef.doc(id).update({
    isCompleted: true,
  });
  const todoUpdated = await getById(id);
  return todoUpdated;
};

const updatedList = async (ids: string[]) => {
  return Promise.all(
    ids.map(async (id) => {
      return await updated(id);
    })
  );
};

export default {
  getAll,
  getById,
  created,
  deleted,
  deletedList,
  updated,
  updatedList,
};
