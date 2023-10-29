import { createIssuesRepository } from './issues/index.mjs';

export const createRepositories = ({ clients }) => ({
  issues: createIssuesRepository({ clients }),
});
