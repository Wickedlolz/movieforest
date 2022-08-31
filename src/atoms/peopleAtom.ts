import { atom } from 'recoil';
import { IActor } from '../interfaces/person';

export const peopleState = atom<IActor[] | null>({
    key: 'peopleState',
    default: null,
});
