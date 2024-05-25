import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7va5P6LeLH_QXp01xGZOzxChd15HtVlo",
  authDomain: "bdprojetoddm1.firebaseapp.com",
  projectId: "bdprojetoddm1",
  storageBucket: "bdprojetoddm1.appspot.com",
  messagingSenderId: "655219168338",
  appId: "1:655219168338:web:6892b900334f439337fb8b"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };