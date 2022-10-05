import { cloneDeep } from 'lodash';
import {
  IMAGE_UPLOAD,
  SET_UP_CANVAS_SIZE,
  MAKE_FACE,
  MAKE_VERTEX,
  EDIT_MODE_TOGGLE,
  AUTO_POPULATE,
  SET_BACKGROUND_POLY,
  DOWNLOAD_FLATTEN_IMG,
  SELECT_LAYER,
  SELECT_FACE,
  ADJUST_VERTEX_POSITION,
  NOTICE_MESSAGE,
  SELECTED_POLY_COLOR_CHANGE,
  DELETE_POLY
} from '../constants/actionTypes';
import autoPopulate from '../lib/autoPopulate';

export const defaultState = {
  uploadedImage: null,
  scale: 1,
  vertexSnapGap: 10,
  vertexNode: [],
  faceNode: [],
  polyEditMode: false,
  canvasWidth: 0,
  canvasHeight: 0,

  backgroundVertexNode: [],
  backgroundVariance: 0.4,
  backgroundCellSize: 60,
  backgroundMaxCols: 0,
  backgroundMaxRows: 0,
  flattenImage: false,

  selectedLayer: null,
  selectedFace: null,
  message: []
};

const reducer = (state = defaultState, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case IMAGE_UPLOAD: {
      if (action.imageFile) {
        newState.uploadedImage = action.imageFile;
      } else {
        newState.uploadedImage = null;
      }
      newState.backgroundVertexNode = [];
      newState.vertexNode = [];
      newState.faceNode = [];
      return newState;
    }

    case MAKE_FACE: {
      let newFaceNode = {
        vertices: action.vertices.map(vertex => vertex.id),
        backgroundColor: action.color,
        id: action.id
      };
      newState.faceNode.push(newFaceNode);
      return newState;
    }

    case SET_UP_CANVAS_SIZE: {
      newState.canvasWidth = action.width;
      newState.canvasHeight = action.height;
      newState.backgroundMaxCols = Math.ceil(((newState.canvasWidth + newState.backgroundCellSize * 2) / newState.backgroundCellSize) + 2);
      newState.backgroundMaxRows = Math.ceil((newState.canvasHeight + newState.backgroundCellSize * 2) / (newState.backgroundCellSize * 0.865));
      return newState;
    }

    case MAKE_VERTEX: {
      if (action.vertex) {
        newState.vertexNode.push(action.vertex);
      } else {
        newState.vertexNode.pop();
      }
      return newState;
    }

    case EDIT_MODE_TOGGLE: {
      newState.polyEditMode = action.on;
      if (!action.on) {
        newState.selectedFace = null;
      }
      return newState;
    }

    case AUTO_POPULATE: {
      return autoPopulate(newState);
    }

    case SET_BACKGROUND_POLY: {
      if (action.category === 'variance') {
        newState.backgroundVariance = Number(action.data);
      } else if (action.category === 'cellsize') {
        newState.backgroundCellSize = Number(action.data);
        newState.backgroundMaxCols = Math.ceil(((newState.canvasWidth + newState.backgroundCellSize * 2) / newState.backgroundCellSize) + 2);
        newState.backgroundMaxRows = Math.ceil((newState.canvasHeight + newState.backgroundCellSize * 2) / (newState.backgroundCellSize * 0.865));
      }
      return newState;
    }

    case DOWNLOAD_FLATTEN_IMG: {
      if (action.request) {
        newState.flattenImage = true;
      } else {
        newState.flattenImage = false;
      }
      return newState;
    }

    case SELECT_LAYER: {
      newState.selectedLayer = action.layer;
      return newState;
    }

    case SELECT_FACE: {
      if (action.face) {
        newState.selectedFace = action.face;
      } else {
        newState.selectedFace = null;
      }
      return newState;
    }

    case ADJUST_VERTEX_POSITION: {
      newState.vertexNode[action.index].x = action.x;
      newState.vertexNode[action.index].y = action.y;
      return newState;
    }

    case NOTICE_MESSAGE: {
      if (action.message) {
        newState.message.push(action.message);
      } else {
        newState.message.shift();
      }
      return newState;
    }

    case SELECTED_POLY_COLOR_CHANGE: {
      if (action.poly > -1) {
        newState.faceNode[action.poly].backgroundColor = action.color;
      } else {
        newState.faceNode[newState.selectedFace.id].backgroundColor = action.color;
      }
      newState.selectedFace.backgroundColor = action.color;
      return newState;
    }

    case DELETE_POLY: {
      newState.faceNode.splice(newState.faceNode.findIndex(value => value.id === action.poly.id), 1);
      newState.vertexNode = newState.vertexNode.reduce((accom, value, index, array) => {
        if (value.id !== action.poly.vertices[0] && value.id !== action.poly.vertices[1] && value.id !== action.poly.vertices[2]) {
          accom.push(value);
        }
        return accom;
      }, []);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer
