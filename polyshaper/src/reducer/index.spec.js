import deepFreeze from 'deep-freeze';
import reducer from './index';
import { uploadImageHandler, makeFace, makeVertex, editMode, autoPopulate, setBackgroundPoly, downloadFlattenImage } from '../action';
import { defaultState } from './index';

describe('reducer', () => {
  it('should provide the initial state', function() {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  describe('IMAGE_UPLOAD Action:', () => {
    it('should return correct state when image uploaded success', () => {
      const stateBefore = {
        uploadedImage: null
      };
  
      const imageFile = 'image URL';
      const action = uploadImageHandler(imageFile);
  
      const stateAfter = {
        uploadedImage: imageFile
      };
  
      deepFreeze(stateBefore);
      deepFreeze(action);
  
      expect(reducer(stateBefore, action)).toMatchObject(stateAfter);
    });

    it('should not change the state when uploaded invalid file', () => {
      const stateBefore = {
        uploadedImage: null
      };

      const imageFile = null;
      const action = uploadImageHandler(imageFile);

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action)).toMatchObject(stateBefore);
    });

    it('should not change the state when uploaded file is empty string', () => {
      const stateBefore = {
        uploadedImage: null
      };

      const imageFile = '';
      const action = uploadImageHandler(imageFile);

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action)).toMatchObject(stateBefore);
    });

    it('should handle properly when `backgroundVertexNode`, `vertexNode`, `faceNode` arrays are empty', () => {
      const stateBefore = {
        uploadedImage: null
      };

      const imageFile = 'image file';
      const action = uploadImageHandler(imageFile);

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action).backgroundVertexNode).toHaveLength(0);
      expect(reducer(stateBefore, action).vertexNode).toHaveLength(0);
      expect(reducer(stateBefore, action).faceNode).toHaveLength(0);
    });
  });

  describe('MAKE_FACE Action:', () => {
    it('should return correct state when `action.vertices` array has multiple items.', () => {
      const stateBefore = {
        faceNode: []
      };
  
      const action = makeFace([{id: 0}, {id: 1}, {id: 2}], 'green');
      
      let newFaceNode = {
        vertices: [0, 1, 2],
        backgroundColor: 'green',
        id: 0
      };
  
      const stateAfter = {
        faceNode: [newFaceNode]
      };
  
      deepFreeze(stateBefore);
      deepFreeze(action);
  
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('`action.vertices` array should contain each id', () => {
      const stateBefore = {
        faceNode: []
      };

      const action = makeFace([{id: 0}, {id: 1}, {id: 2}], 'yellow');

      const stateAfter = {
        faceNode: [{backgroundColor: 'yellow', id: 1, vertices: [0, 1, 2]}]
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action)).toEqual(stateAfter);
      expect(reducer(stateBefore, action).faceNode).toHaveLength(1);
      expect(reducer(stateBefore, action).faceNode[0].vertices).toHaveLength(3);
      expect(reducer(stateBefore, action).faceNode[0].vertices).toEqual([0, 1, 2]);
    });

    it('should have correct properties each `action.vertices` array ', () => {
      const stateBefore = {
        faceNode: []
      };

      const action = makeFace([{
        id: 0,
        x: 100,
        y: 300,
        next: [1, 2]
      }, {
        id: 1,
        x: 200,
        y: 10,
        next: [0, 2]
      }, {
        id: 2,
        x: 500,
        y: 100,
        next: [0, 1]
      }], 'red');

      deepFreeze(stateBefore);
      deepFreeze(action);
      
      expect(Object.keys(reducer(stateBefore, action).faceNode[0])).toContain('id');
      expect(Object.keys(reducer(stateBefore, action).faceNode[0])).toContain('vertices');
      expect(Object.keys(reducer(stateBefore, action).faceNode[0])).toContain('backgroundColor');
    });
  });

  describe('MAKE_VERTEX action:', () => {
    it('should return correct state when work success', () => {
      const stateBefore = {
        vertexNode: []
      };
  
      const newVertex = {
        x: 0,
        y: 0,
        id: 0,
        next: []
      };
  
      const action = makeVertex(newVertex);
  
      const stateAfter = {
        vertexNode: [{
          x: 0,
          y: 0,
          id: 0,
          next: []
        }]
      };
  
      deepFreeze(stateBefore);
      deepFreeze(action);
  
      expect(Array.isArray(stateAfter.vertexNode)).toBe(true);
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not change state when `vertex` is null', () => {
      const stateBefore = {
        vertexNode: []
      };

      const newVertex = null;

      const action = makeVertex(newVertex);

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action)).toMatchObject(stateBefore);
      expect(Array.isArray(reducer(stateBefore, action).vertexNode)).toBe(true);
    });

    it('state should contain original vertex and added vertex ', () => {
      const stateBefore = {
        vertexNode: [{
          x: 0,
          y: 100,
          id: 20
        }]
      };

      const newVertex = {x: 100, y: 500, id: 21};

      const action = makeVertex(newVertex);

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(reducer(stateBefore, action).vertexNode).toHaveLength(2);
      expect(reducer(stateBefore, action).vertexNode[0]).toEqual({x: 0, y: 100, id: 20});
    });
  });

  describe('EDIT_MODE_TOGGLE action:', () => {
    it('should return false state when argument is false', () => {
      const stateFalse = {
        polyEditMode: false
      };

      const stateTrue = {
        polyEditMode: true
      };

      const actionEditModeOn = editMode(true);

      deepFreeze(stateTrue);
      deepFreeze(stateFalse);
      deepFreeze(actionEditModeOn);
      
      expect(reducer(stateFalse, actionEditModeOn)).toEqual(stateTrue);    
    });


    it('should return true state when argument is true', () => {
      const stateFalse = {
        polyEditMode: false,
        selectedFace: null
      };
      
      const stateTrue = {
        polyEditMode: true
      };
  
      const actionEditModeOff = editMode(false);
  
      deepFreeze(stateTrue);
      deepFreeze(stateFalse);
      deepFreeze(actionEditModeOff);
  
      expect(reducer(stateTrue, actionEditModeOff)).toEqual(stateFalse);
    });

    it('should return boolean type state', () => {
      const stateFalse = {
        polyEditMode: false
      };

      const actionEditModeOn = editMode(true);
      const actionEditModeOff = editMode(false);

      deepFreeze(stateFalse);
      deepFreeze(actionEditModeOn);
      deepFreeze(actionEditModeOff);

      expect(typeof reducer(stateFalse, actionEditModeOn).polyEditMode).toBe('boolean');
      expect(typeof reducer(stateFalse, actionEditModeOff).polyEditMode).toBe('boolean');
    });
  });

  describe('AUTO_POPULATE action:', () => {
    it('shoud return state ', () => {
      const stateBefore = {
        backgroundCellSize: 60,
        backgroundMaxCols: 24,
        backgroundMaxRows: 15,
      };
  
      const action = autoPopulate(stateBefore);
  
      deepFreeze(stateBefore);
      deepFreeze(action);
  
      expect(typeof reducer(stateBefore, action)).toBe('object');
      expect(Array.isArray(reducer(stateBefore, action).backgroundVertexNode)).toBe(true);
      expect(reducer(stateBefore, action).backgroundVertexNode.length).toBeTruthy();
    });
    
    it('should not change state if state contains falsy value', () => {
      const stateBefore = {
        backgroundCellSize: 60,
        backgroundMaxCols: 0,
        backgroundMaxRows: 0,
      };

      const action = autoPopulate(stateBefore);

      deepFreeze(stateBefore);
      deepFreeze(action);
      
      expect(reducer(stateBefore, action).backgroundVertexNode).toBeFalsy();
    });
  });

  describe('SET_BACKGROUND_POLY action:', () => {
    it('should set data as action input', () => {
      const stateBefore = {
        backgroundVariance: 0
      };

      const action = setBackgroundPoly(0.4, 'variance');

      const stateAfter = {
        backgroundVariance: 0.4
      };

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(typeof reducer(stateBefore, action).backgroundVariance).toBe('number');
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('diffrent result when input category is `variance` or `cellsize`', () => {
      const stateBefore = {
        backgroundVariance: 0,
        backgroundCellSize: 0
      };

      const actionSetVariance = setBackgroundPoly(0.5, 'variance');
      const actionSetCellsize = setBackgroundPoly(50, 'cellsize');

      const stateAfterSetVariance = {
        backgroundVariance: 0.5
      };

      const stateAfterSetCellsize = {
        backgroundCellSize: 50
      };

      deepFreeze(stateBefore);
      deepFreeze(actionSetVariance);

      expect(typeof reducer(stateBefore, actionSetVariance).backgroundVariance).toBe('number');
      expect(reducer(stateBefore, actionSetVariance)).toMatchObject(stateAfterSetVariance);
      expect(typeof reducer(stateBefore, actionSetCellsize).backgroundCellSize).toBe('number');
      expect(reducer(stateBefore, actionSetCellsize)).toMatchObject(stateAfterSetCellsize);
    });

    it('should change `backgroundMaxCols` and `backgroundMaxRows` if cellsize changed', () => {
      const stateBefore = {
        backgroundCellSize: 0,
        backgroundMaxCols: 0,
        backgroundMaxRows: 0
      };

      const action = setBackgroundPoly(60, 'cellsize');

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(typeof reducer(stateBefore, action).backgroundCellSize).toBe('number');
      expect(reducer(stateBefore, action).backgroundCellSize).toBe(60);
      expect(reducer(stateBefore, action).backgroundMaxCols).not.toBe(0);
      expect(reducer(stateBefore, action).backgroundMaxRows).not.toBe(0);
    });
  });

  describe('DOWNLOAD_FLATTEN_IMG action:',() => {
    it('should return boolean type state', () => {
      const stateFalse = {
        flattenImage: false
      };

      const actionNull = downloadFlattenImage();

      deepFreeze(stateFalse);
      deepFreeze(actionNull);

      expect(typeof reducer(stateFalse, actionNull).flattenImage).toBe('boolean');
    });

    it('return boolean state what argument truthy or falsy', () => {
      const stateFalse = {
        flattenImage: false
      };
  
      const stateTrue = {
        flattenImage: true
      };
  
      const actionTruthy = downloadFlattenImage(true);
      const actionNull = downloadFlattenImage();

      deepFreeze(stateFalse);
      deepFreeze(stateTrue);
      deepFreeze(actionTruthy);
      deepFreeze(actionNull);
  
      expect(reducer(stateFalse, actionTruthy)).toEqual(stateTrue);
      expect(reducer(stateTrue, actionNull)).toEqual(stateFalse);
      expect(typeof reducer(stateTrue, actionNull).flattenImage).toBe('boolean');
    });

  });
});
