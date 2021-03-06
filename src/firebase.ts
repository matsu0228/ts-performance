import firebase from "firebase";
import "firebase/firestore";
import "firebase/functions";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_MEASUREMENT_ID
} from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
  });
}

export default firebase;

export const getDoc = async (collectionId: string, docId: string) => {
  return firebase
    .firestore()
    .collection(collectionId)
    .doc(docId)
    .get()
    .then(doc => (!doc?.exists ? null : { ...doc.data(), id: doc.id }));
};

export const getDocs = async (collectionId: string) => {
  return firebase
    .firestore()
    .collection(collectionId)
    .get()
    .then(qs =>
      qs.docs.map(doc => (!doc?.exists ? null : { ...doc.data(), id: doc.id }))
    );
};

export const getFirebaseDocFromCache = (
  collectionId: string,
  docId: string
) => {
  const docProcess = (doc: any) =>
    doc.exists
      ? {
          id: doc.id,
          ...doc.data()
        }
      : null;
  return firebase
    .firestore()
    .collection(collectionId)
    .doc(docId)
    .get({ source: "cache" })
    .then(docProcess)
    .catch(e =>
      firebase
        .firestore()
        .collection(collectionId)
        .doc(docId)
        .get()
        .then(docProcess)
        .catch(e => ({ error: "nodoc" }))
    );
};
