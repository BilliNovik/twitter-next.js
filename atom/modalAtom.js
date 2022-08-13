import { atom } from "recoil";

export const modalDeleteState = atom({
    key: 'modalDeleteState',
    default: false,
});

export const modalCommentState = atom({
    key: 'modalCommentState',
    default: false,
});

export const globalIDState = atom({
    key: 'globalIDState',
    default: 'id',
});

export const globalPostState = atom({
    key: 'globalPostState',
    default: {},
});
