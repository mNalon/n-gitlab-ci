export const list = ({ clients }) => ({ projectId, pagination = {} }) => {
  const { page = 1, perPage = 20 } = pagination;
  return clients.gitlab(`/projects/${projectId}/issues?page=${page}&per_page=${perPage}`);
};
