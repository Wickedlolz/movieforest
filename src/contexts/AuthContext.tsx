import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase.config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
} from 'firebase/auth';

import { setDoc, doc } from 'firebase/firestore';

interface IAuth {
    user: User | null;
    signUp: (
        email: string,
        password: string
    ) => Promise<void> | Promise<UserCredential>;
    signIn: (
        email: string,
        password: string
    ) => Promise<void> | Promise<UserCredential>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    loading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredentials.user);
            setDoc(doc(db, 'users', email), {
                savedMovies: [],
                savedShows: [],
                watchList: [],
            });
            setLoading(false);
            navigate('/');
        } catch (error: any) {
            setLoading(true);
            throw error;
        }
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredentials.user);
            setLoading(false);
            navigate('/');
        } catch (error: any) {
            setLoading(true);
            throw error;
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            await signOut(auth);
            setUser(null);
        } catch (error: any) {
            alert(error.message);
            setLoading(true);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(true);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(AuthContext);
}
