import API from '../network/http';

export default async function getPublicMindMapData() {
  return API({
    method: 'get',
    url: '/mind-maps',
    params: { access: 'public', max: 15 },
  });
}
export async function getAllMindMapId() {
  return API({
    method: 'get',
    url: '/all-mind-maps-id',
  });
}

export async function getMyMindMapData(userId) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps`,
    params: { access: 'mixed', max: 15 },
  });
}

export async function getMindMapData(userId, mindMapId) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
  });
}

export async function createMindMapData(userId) {
  return API({
    method: 'post',
    url: `/users/${userId}/mind-maps`,
  });
}

export async function updateMindMapData(userId, mindMapId, mindMapData) {
  return API({
    method: 'put',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
    data: mindMapData,
  });
}

export async function deleteMindMapData(userId, mindMapId) {
  return API({
    method: 'delete',
    url: `/users/${userId}/mind-maps/${mindMapId}`,
  });
}

export async function getMindMapAccessInfo(userId, mindMapId) {
  return API({
    method: 'get',
    url: `/users/${userId}/mind-maps/${mindMapId}/access`,
  });
}
