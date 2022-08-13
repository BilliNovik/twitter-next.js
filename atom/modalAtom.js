import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false,
});

export const deleteIdState = atom({
    key: 'deleteIdState',
    default: '',
});

export const deletePostState = atom({
    key: 'deletePostState',
    default: {},
});