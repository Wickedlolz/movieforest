import { atom } from 'recoil';

interface NotificationStateProps {
    show: boolean;
    msg: string;
    type: string;
}

const initialState = {
    show: false,
    msg: '',
    type: '',
};

export const notificationAtom = atom<NotificationStateProps>({
    key: 'notificationAtom',
    default: initialState,
});
