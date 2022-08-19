import { atom } from 'recoil';

interface PeopleStateProps {
    adult: boolean;
    gender: number;
    id: number;
    known_for: [];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export const peopleState = atom<PeopleStateProps[] | null>({
    key: 'peopleState',
    default: null,
});
