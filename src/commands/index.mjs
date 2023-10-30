import { createIssuesCommands } from './issues/index.mjs';

export const createCommands = ({ repositories }) => ({
  issues: createIssuesCommands({ repositories }),
});
