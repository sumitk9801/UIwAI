
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "uiwai-9fcc3.firebaseapp.com",
  projectId: "uiwai-9fcc3",
  storageBucket:"uiwai-9fcc3.firebasestorage.app",
  messagingSenderId: "1031988523683",
  appId:"1:1031988523683:web:6e0dd00bbf289e1f9a0516"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Request profile and email scopes
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  prompt: 'consent'
});

export { auth, provider };