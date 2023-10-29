import { gitlab } from './gitlab.mjs';

export const createClients = ({ settings }) => ({
  gitlab: gitlab({ settings }),
});
