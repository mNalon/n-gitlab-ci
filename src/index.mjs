#!/usr/bin/env node

import { createClients } from './clients/index.mjs';
import { createRepositories } from './repositories/index.mjs';
import { createCommands } from './commands/index.mjs';

const settings = {
  gitlabAPIAddress: process.env.GITLAB_API_ADDRESS,
  gitlabAPIToken: process.env.GITLAB_API_TOKEN,
};

const clients = createClients({ settings });

const repositories = createRepositories({ clients });

const commands = createCommands({ repositories });

const [_exec, _path, resource, command, ...args] = process.argv;

const selectedCommand = commands?.[resource]?.[command];

if (!selectedCommand) {
  throw new Error('Invalid command!');
}

selectedCommand({ args }).then(() => {
  console.log('Success!');
}).catch(console.error);
