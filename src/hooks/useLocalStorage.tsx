import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../atoms/themeAtom';

const useLocalStorage = (
    key: string,
    initialValue: string
): [theme: string, setItem: (value: string) => void] => {
    const [theme, setTheme] = useRecoilState(themeState);

    useEffect(() => {
        const item = localStorage.getItem(key);

        if (item) {
            setTheme(item);
        } else {
            setTheme(initialValue);
        }
    }, [key, initialValue, setTheme]);

    const setItem = (value: string) => {
        localStorage.setItem(key, value);
        setTheme(value);
    };

    return [theme, setItem];
};

export default useLocalStorage;
