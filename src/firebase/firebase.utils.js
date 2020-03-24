import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA7jn7csZgiyPKTGvfU2TdHEYtoko5AjXg",
  authDomain: "ecommerce-portfolio-carlo.firebaseapp.com",
  databaseURL: "https://ecommerce-portfolio-carlo.firebaseio.com",
  projectId: "ecommerce-portfolio-carlo",
  storageBucket: "ecommerce-portfolio-carlo.appspot.com",
  messagingSenderId: "162762498507",
  appId: "1:162762498507:web:d5d5bcce32d64955f5d64e",
  measurementId: "G-L48M5YF3MM"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
