import API from '../network/http';

export async function getNodesData(userId, mindMapId, nodeId, max = 30) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
    params: { max },
  });
}

export async function putNodesData(userId, mindMapId, nodeId, nodeData) {
  return API({
    method: 'put',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
    data: nodeData,
  });
}

export async function postNodesData(userId, mindMapId, nodeId, nodeData) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
    data: nodeData,
  });
}

export async function deleteNodesData(userId, mindMapId, nodeId) {
  return API({
    method: 'delete',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}`,
  });
}

export async function getCommentsData(userId, mindMapId, nodeId) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/comments`,
  });
}

export async function postCommentsData(userId, mindMapId, nodeId, commentData) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/comments`,
    data: commentData,
  });
}

export async function postImagesData(userId, mindMapId, nodeId, imageData) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/images`,
    data: imageData,
  });
}

export async function deleteImagesData(userId, mindMapId, nodeId, imageData) {
  return API({
    method: 'put',
    url: `/users/${userId}/mind-maps/${mindMapId}/nodes/${nodeId}/images`,
    data: { path: imageData },
  });
}
