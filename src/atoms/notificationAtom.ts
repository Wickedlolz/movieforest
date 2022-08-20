import { atom } from 'recoil';

interface NotificationStateProps {
    show: boolean;
    msg: string;
}

const initialState = {
    show: false,
    msg: '',
};

export const notificationAtom = atom<NotificationStateProps>({
    key: 'notificationAtom',
    default: initialState,
});
