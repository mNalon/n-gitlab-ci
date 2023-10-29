const REQUIRED_GITLAB_API_ADDRESS_SETTING_ERROR_MESSAGE = `
    Gitlab API host is not defined. Set GITLAB_API_HOST environment variable!
`;

const REQUIRED_GITLAB_API_TOKEN_SETTING_ERROR_MESSAGE = `
    Gitlab API token is not defined. Set GITLAB_API_TOKEN environment variable!
`;

export const gitlab = ({ settings }) => (path, options = {}) => {
  const {
    gitlabAPIAddress,
    gitlabAPIToken,
  } = settings;

  if (!gitlabAPIAddress) throw new Error(REQUIRED_GITLAB_API_ADDRESS_SETTING_ERROR_MESSAGE);

  if (!gitlabAPIToken) throw new Error(REQUIRED_GITLAB_API_TOKEN_SETTING_ERROR_MESSAGE);

  const uri = `${gitlabAPIAddress}/api/v4${path}`;
  const headers = {
    ...options.headers,
    'Private-Token': gitlabAPIToken,
  };

  return fetch(uri, {
    ...options,
    headers,
  }).then((response) => {
    if (!response.ok) {
      const errorMessage = `Error while communicating with gitlab API (${response.url}). Response status:${response.status}`;
      throw new Error(errorMessage);
    }
    return response.json();
  }).catch((error) => {
    const errorMessage = `Error while communicating with gitlab API (${uri}). Error: ${error.message}`;
    throw new Error(errorMessage);
  });
};
