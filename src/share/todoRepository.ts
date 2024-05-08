import { Timestamp } from 'firebase-admin/firestore';
import { ToDoes } from '../handlers/todoes.interface';
import { postRef } from './firestore.config';

const getAll = async () => {
  const dataFirestore = await postRef.get();
  const snapshot = dataFirestore.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return snapshot;
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
  const requestBody = {
    text: data.text,
    isCompleted: false,
    createdAt: Timestamp.fromDate(new Date()),
  };
  const docRef = await postRef.add(requestBody);
  console.log('Document successfully written with ID: ', docRef.id);
  return docRef.id;
};

const deleted = async (id: string) => {
  const todo = await getById(id);
  console.log('todo', todo);

  if (!todo) {
    return null;
  }
  const snapshot = await postRef.doc(id).delete();

  return snapshot;
};

const deletedList = async (ids: string[]) => {
  return Promise.all(
    ids.map(async (id) => {
      return await deleted(id);
    })
  );
};

const updated = async (id: string) => {
  const todo = await getById(id);
  if (!todo) {
    return null;
  }

  const snapshot = await postRef.doc(id).update({
    isCompleted: true,
  });

  return snapshot;
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
