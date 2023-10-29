export const deleteIssue = ({ clients }) => ({ projectId, issueIid }) => {
  const method = 'DELETE';
  return clients.gitlab(`/projects/${projectId}/issues/${issueIid}`, { method });
};
