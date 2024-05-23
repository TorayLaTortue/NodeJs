import { Roles, UserType } from '@/features/user/userType';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

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
    const user = await signInWithEmailAndPassword(auth, email, password)
        .then(parseUserCredential)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
    return user;
}

// parse user from firebase to app user
const parseUserCredential = async (userCredential: UserCredential): Promise<{ info: UserType, idToken: string }> => {
    const user = userCredential.user;
    const idToken = await user.getIdTokenResult();

    return ({
        info: {
            displayName: user.displayName ?? 'Anonymous',
            email: user.email ?? 'unknown@unknown.com',
            uid: user.uid ?? '00000',
            role: idToken.claims.role as Roles ?? 'user',
            photoURL: user.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
        },
        idToken: idToken.token
    });
}