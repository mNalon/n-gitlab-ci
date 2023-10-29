import { createClients } from './clients/index.mjs';
import { createRepositories } from './repositories/index.mjs';

const settings = {
  gitlabAPIAddress: 'https://gitlab.globoi.com',
  gitlabAPIToken: 'Pt9FsGmvcPSSrWH7btkE',
};

const clients = createClients({ settings });

const repositories = createRepositories({ clients });

repositories.issues.list({
  projectId: 621,
  pagination: {
    page: 2,
    perPage: 1,
  },
}).then((issue) => {
  repositories.issues.delete({ projectId: 621, issueIid: issue[0].iid }).then(() => {
    console.log('deleted...');
  }).catch(console.error);
});
