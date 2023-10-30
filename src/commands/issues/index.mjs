import fs from 'fs';
import path from 'path';

import { parseArgs } from '../parse-args.mjs';

const createBackupManager = (projectId) => {
  const backupDirName = `${projectId}_issues_bkp`;
  const backupDirPath = path.join(process.cwd(), backupDirName);

  if (fs.existsSync(backupDirPath)) throw new Error(`The backup directory (${backupDirPath}) already exists. Delete it and try again.`);
  fs.mkdirSync(backupDirPath);

  const backupIssue = (issue) => {
    const issueBackFileUri = path.join(backupDirPath, `${issue.iid}.json`);
    fs.writeFileSync(issueBackFileUri, JSON.stringify(issue));
  };

  return { backupIssue };
};

const extractOptionsFromArgs = (args) => {
  const optionsSchema = {
    projectId: 'int',
  };

  const parser = parseArgs(optionsSchema);

  return parser(args);
};

async function* getAllIssues({ repositories, projectId }) {
  let page = 1;
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const fetchedIssues = await repositories.issues.list({ projectId, pagination: { page } });
    if (!fetchedIssues.length) break;
    // eslint-disable-next-line no-restricted-syntax
    for (const issue of fetchedIssues) {
      yield issue;
    }
    page += 1;
  }
}

const createBackupCommand = ({ repositories }) => async ({ args = [] }) => {
  const { projectId } = extractOptionsFromArgs(args);

  if (!projectId) throw new Error('Missing required option: projectId');

  const backupManager = createBackupManager(projectId);

  // eslint-disable-next-line no-restricted-syntax
  for await (const issue of getAllIssues({ repositories, projectId })) {
    backupManager.backupIssue(issue);
  }
};

const createDeleteAllCommand = ({ repositories }) => async ({ args = [] }) => {
  const { projectId } = extractOptionsFromArgs(args);

  if (!projectId) throw new Error('Missing required option: projectId');

  // eslint-disable-next-line no-restricted-syntax
  for await (const issue of getAllIssues({ repositories, projectId })) {
    repositories.issues.delete({
      projectId,
      issueIid: issue.iid,
    });
  }
};

export const createIssuesCommands = ({ repositories }) => ({
  backup: createBackupCommand({ repositories }),
  deleteAll: createDeleteAllCommand({ repositories }),
});
