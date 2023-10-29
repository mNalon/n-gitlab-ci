import { list } from './list.mjs';
import { deleteIssue } from './delete.mjs';

export const createIssuesRepository = ({ clients }) => ({
  list: list({ clients }),
  delete: deleteIssue({ clients }),
});
