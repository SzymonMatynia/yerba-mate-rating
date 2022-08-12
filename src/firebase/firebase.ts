import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAtNTGe8m3FkZK_QzWXaBfthqmTpwvpJ_A',
  authDomain: 'yerba-mate-rating.firebaseapp.com',
  projectId: 'yerba-mate-rating',
  storageBucket: 'yerba-mate-rating.appspot.com',
  messagingSenderId: '57794379917',
  appId: '1:57794379917:web:eec840807063f426e222c4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;

