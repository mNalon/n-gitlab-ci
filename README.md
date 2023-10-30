A CLI to interact with Gitlab API and manage your projects
---

## Usage

Setup the following environment variables on your system:

- GITLAB_API_ADDRESS (E.g. https://gitlab.com)
- GITLAB_API_TOKEN (Personal Access Token)

Then:

```
npx n-gitlab-cli <resource> <command> <options>
```

Each resource support specific commands and options.

Bellow follows the resources are currently supported.

### Issues

#### backup

Creates a directory with all the issues of a project backed up into json files.

Options:

- projectId (required)

The created directory will follow the pattern name `<project_id>_issues_backup` and it is created in the current directory where the command is typed.

Example:

```
npx n-gitlab-cli issues backup projectId=621
```

#### deleteAll

Deletes all issues of a project.

Options:

- projectId (required)

Example:

```
npx n-gitlab-cli issues deleteAll projectId=621
```

