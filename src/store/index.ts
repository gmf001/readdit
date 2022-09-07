import { atomWithStorage } from 'jotai/utils';

export const filterAtom = atomWithStorage('filter', {
  title: 'Home',
  value: ''
});
