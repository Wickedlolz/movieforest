import { atom } from 'recoil';

interface IPeople {
    adult: boolean;
    gender: number;
    id: number;
    known_for: [];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export const peopleState = atom<IPeople[] | null>({
    key: 'peopleState',
    default: null,
});
