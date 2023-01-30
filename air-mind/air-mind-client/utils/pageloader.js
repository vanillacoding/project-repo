import { getCookie } from 'cookies-next';
import { getMindMapAccessInfo } from '../service/mindmaprequests';
import { getNodesData } from '../service/noderequests';

const pageLoader = async (
  userData,
  setUserData,
  mindMapData,
  setMindMapData,
  setNodeData,
  setError,
  router,
  mindMapId,
) => {
  try {
    let userId;
    let headNodeId;

    if (!mindMapData || Object.keys(mindMapData).length === 0) {
      userId = 'anonymous';
      const responseAccess = await getMindMapAccessInfo(userId, mindMapId);

      if (responseAccess.result === 'error') {
        throw responseAccess.error;
      } else if (getCookie('loginData') || responseAccess.access === 'public') {
        userId = responseAccess.mindMap.author;
        headNodeId = responseAccess.mindMap.headNode;
        setUserData(responseAccess.mindMap.author);
        setMindMapData(responseAccess.mindMap);
      } else if (responseAccess.access === 'private') {
        router.push('/login');
        return;
      } else {
        throw new Error('Error during request of mindmap access data');
      }
    } else {
      ({ _id: userId } = userData);
      headNodeId = mindMapData.headNode;
    }

    const responseNodes = await getNodesData(userId, mindMapId, headNodeId, 50);

    if (responseNodes.result === 'error') {
      throw responseNodes.error;
    }

    setNodeData(responseNodes.node);
  } catch (error) {
    error.message = `Error in MindMap component : ${error.message}`;

    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    setError(error);
    router.push('/error');
  }
};

export default pageLoader;
