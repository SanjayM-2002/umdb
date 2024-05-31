import { atom } from 'recoil';

export const currentMovieAtom = atom({
  key: 'currentMovie',
  default: null,
});
