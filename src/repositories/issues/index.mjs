import { list } from './list.mjs';

export const createIssuesRepository = ({ clients }) => ({
  list: list({ clients }),
});
