import { atom } from 'jotai';

export const filter = atom('');

export const filterAtom = atom(
  (get) => get(filter),
  (get, set, subreddit: string) => {
    set(filter, subreddit);
  }
);
