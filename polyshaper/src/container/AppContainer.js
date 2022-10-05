import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  uploadImageHandler,
  setUpCanvasSize,
  makeFace,
  makeVertex,
  editMode,
  autoPopulate,
  setBackgroundPoly,
  downloadFlattenImage,
  layerSelectHandler,
  faceSelectHandler,
  selectedVertexAdjustPosition,
  noticeMessage,
  selectedPolyColorChange,
  deletePolyHandler
} from '../action';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    uploadedImage: state.uploadedImage,
    scale: state.scale,
    vertexSnapGap: state.vertexSnapGap,
    faceNode: state.faceNode,
    vertexNode: state.vertexNode,
    polyEditMode: state.polyEditMode,
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    backgroundVertexNode: state.backgroundVertexNode,
    backgroundVariance: state.backgroundVariance,
    backgroundCellSize: state.backgroundCellSize,
    backgroundMaxCols: state.backgroundMaxCols,
    backgroundMaxRows: state.backgroundMaxRows,
    flattenImage: state.flattenImage,
    selectedLayer: state.selectedLayer,
    selectedFace: state.selectedFace,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageHandler(imageFile) {
      dispatch(uploadImageHandler(imageFile));
    },

    setUpCanvasSize(width, height) {
      dispatch(setUpCanvasSize(width, height));
    },

    makeFace(vertices, color) {
      dispatch(makeFace(vertices, color));
    },

    makeVertex(vertex) {
      dispatch(makeVertex(vertex));
    },

    editMode(boolean) {
      dispatch(editMode(boolean));
    },

    autoPopulate() {
      dispatch(autoPopulate());
    },

    setBackgroundPoly(data, category) {
      dispatch(setBackgroundPoly(data, category));
      dispatch(autoPopulate());
    },

    downloadFlattenImage(request) {
      dispatch(downloadFlattenImage(request));
    },

    layerSelectHandler(layer) {
      dispatch(layerSelectHandler(layer));
    },

    faceSelectHandler(face) {
      dispatch(faceSelectHandler(face));
    },

    selectedVertexAdjustPosition(x, y, index) {
      dispatch(selectedVertexAdjustPosition(x, y, index));
    },

    noticeMessage(message) {
      dispatch(noticeMessage(message));
      setTimeout(() => {
        dispatch(noticeMessage());
      }, 1200);
    },

    selectedPolyColorChange(color, poly) {
      dispatch(selectedPolyColorChange(color, poly));
    },

    deletePolyHandler(poly) {
      dispatch(deletePolyHandler(poly));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
