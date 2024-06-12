import store from '@/app/store';
import { Roles, UserType } from '@/features/user/userType';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, setPersistence, onAuthStateChanged, User, browserLocalPersistence } from 'firebase/auth';
import { removeCredentials, setCredentials } from '@/features/auth/authSlice';
import { userActions } from '@/features/user/userSlice';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY, 
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (import.meta.env.DEV) {
    connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_EMULATOR_URL);
}

// Sign in user on firebase and return user info
export const signInUser = async (email: string, password: string): Promise<{ info: UserType, idToken: string } | void> => {
    await setPersistence(auth, browserLocalPersistence);
    const user = await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => parseUserCredential(userCredential.user))
        .catch((error) => {
            const errorMessage = error.message;
            throw new Error(errorMessage);
        });
    return user;
};

export const signOutUser = async () => {
    await auth.signOut();
}

// parse user from firebase to app user
const parseUserCredential = async (user: User | null): Promise<{ info: UserType, idToken: string } | void> => {
    if (!user) return;
    const idToken = await user.getIdTokenResult(true);

    console.log('2', idToken, user);

    return ({
        info: {
            displayName: user.displayName ?? 'Anonymous',
            email: user.email ?? 'unknown@unknown.com',
            uid: user.uid ?? '00000',
            role: idToken.claims.role as Roles ?? Roles.user,
            photoURL: user.photoURL ?? ''
        },
        idToken: idToken.token,
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const connectedUser = await parseUserCredential(user);
      if (connectedUser) {        
        store.dispatch(setCredentials({
            idToken: connectedUser.idToken
        }));
        store.dispatch(userActions.setUser(connectedUser.info));
      }
    } else {
        store.dispatch(removeCredentials());
        store.dispatch(userActions.resetUser());
    }
  });