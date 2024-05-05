import * as admin from 'firebase-admin';

import { serviceAccount } from './serviceAccount';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const postRef = db.collection('books');
