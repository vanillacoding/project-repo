import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const v4 = uuidv4();

const userInfo = atom({
  key: `userInfo/${v4}`,
  default: {},
});

const currentUserInfo = atom({
  key: `currentUserInfo/${v4}`,
  default: {},
});

const errorInfo = atom({
  key: `errorInfo/${v4}`,
  default: '',
});

const mindMapInfo = atom({
  key: `mindMapInfo/${v4}`,
  default: {},
});

const mindMapListInfo = atom({
  key: `mindMapListInfo/${v4}`,
  default: [],
});

const nodesInfo = atom({
  key: `nodesInfo/${v4}`,
  default: {},
});

const isOpenNodeCommentModal = atom({
  key: `isOpenNodeCommentModal/${v4}`,
  default: false,
});

const isOpenNodeOptionModal = atom({
  key: `isOpenNodeOptionModal/${v4}`,
  default: false,
});

const clickedImgPath = atom({
  key: `clickedImgPath/${v4}`,
  default: '',
});

const clickedNodeId = atom({
  key: `clickedNodeId/${v4}`,
  default: '',
});

const socketInfo = atom({
  key: `socketInfo/${v4}`,
  default: {},
  dangerouslyAllowMutability: true,
});

const deleteInfo = atom({
  key: `deleteInfo/${v4}`,
  default: false,
});

const socketUserInfo = atom({
  key: `socketUserInfo/${v4}`,
  default: {},
});

const foldLockInfo = atom({
  key: `foldLockInfo/${v4}`,
  default: true,
});

const searchInfo = atom({
  key: `searchInfo/${v4}`,
  default: new Set(),
});

export {
  currentUserInfo,
  userInfo,
  errorInfo,
  mindMapInfo,
  mindMapListInfo,
  nodesInfo,
  isOpenNodeCommentModal,
  isOpenNodeOptionModal,
  clickedNodeId,
  socketInfo,
  deleteInfo,
  socketUserInfo,
  foldLockInfo,
  searchInfo,
  clickedImgPath,
};
