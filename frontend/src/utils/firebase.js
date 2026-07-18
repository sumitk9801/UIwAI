
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyD2d1hMVZIX31jTiIEAeOgfRl3aa2HKcjU",
  authDomain: "uiwai-9fcc3.firebaseapp.com",
  projectId: "uiwai-9fcc3",
  storageBucket: "uiwai-9fcc3.firebasestorage.app",
  messagingSenderId: "1031988523683",
  appId: "1:1031988523683:web:6e0dd00bbf289e1f9a0516"
};
  // apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_FIREBASE_APPID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };