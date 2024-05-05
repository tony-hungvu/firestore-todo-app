import { Books } from '../books/books.interface';
import { auth } from 'firebase-admin';
import { postRef } from '../share/firestore.config';

const getAll = async () => {
  try {
    const dataFirestore = await postRef.get();
    const books = dataFirestore.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return books;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

const getById = async (id: string) => {
  try {
    const snapshot = await postRef.doc(id).get();

    if (!snapshot.exists) {
      console.error('Document does not exist');
      return null;
    }

    const bookData = snapshot.data();
    const book = { id: snapshot.id, ...bookData };

    return book;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

const created = async (data: Books) => {
  try {
    const docRef = await postRef.add(data);
    console.log('Document successfully written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error writing document:', error);
    throw error;
  }
};

const deleted = async (id: string) => {
  try {
    const book = await getById(id);

    if (!book) {
      return null;
    }

    const snapshot = await postRef.doc(id).delete();

    return snapshot;
  } catch (error) {
    throw error;
  }
};

const updated = async (id: string, data: Books) => {
  try {
    const book = await getById(id);

    if (!book) {
      return null;
    }

    if ('name' in book) {
      book.name = data.name;
    }
    if ('author' in book) {
      book.author = data.author;
    }

    const snapshot = await postRef.doc(id).update({
      name: data.name,
      author: data.author,
    });

    return snapshot;
  } catch (error) {
    throw error;
  }
};

export default {
  getAll,
  getById,
  created,
  deleted,
  updated,
};
