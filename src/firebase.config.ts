import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB9tV3r_9Zx9mM-4QvP-75xPLx5h4ha8Mw',
    authDomain: 'movie-forest-9c50e.firebaseapp.com',
    projectId: 'movie-forest-9c50e',
    storageBucket: 'movie-forest-9c50e.appspot.com',
    messagingSenderId: '831430407194',
    appId: '1:831430407194:web:da3db0ac3c66ccad0ccda3',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
