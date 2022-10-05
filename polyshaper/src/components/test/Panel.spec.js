import 'jsdom-global/register';
import React from 'react';
import Panel from '../Panel';
import { shallow, mount } from 'enzyme';

function setup(canvasWidth, canvasHeight, backgroundVertexNode, backgroundCellSize, backgroundVariance, backgroundMaxCols, backgroundMaxRows) {

  const downloadFlattenImage = jest.fn();
  const autoPopulate = jest.fn();
  const setBackgroundPoly = jest.fn();
  const editMode = jest.fn();

  const component = shallow(
    <Panel
      editMode={editMode}
      autoPopulate={autoPopulate}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      backgroundVertexNode={backgroundVertexNode}
      downloadFlattenImage={downloadFlattenImage}
      setBackgroundPoly={setBackgroundPoly}
      backgroundCellSize={backgroundCellSize}
      backgroundVariance={backgroundVariance}
      backgroundMaxCols={backgroundMaxCols}
      backgroundMaxRows={backgroundMaxRows}
    />
  );

  return {
    component,
    downloadButton: component.find('.download-image'),
    autoPopulateButton: component.find('.auto-populate'),
    props: {
      editMode,
      autoPopulate,
      canvasWidth,
      canvasHeight,
      backgroundVertexNode,
      downloadFlattenImage,
      setBackgroundPoly,
      backgroundCellSize,
      backgroundVariance,
      backgroundMaxCols,
      backgroundMaxRows
    }
  };
}

describe('Panel component', () => {
  it('should trigger `downloadFlattenImageProp` when download image button is clicked', () => {
    const { props, downloadButton } = setup();
    downloadButton.simulate('click');
    expect(props.downloadFlattenImage.mock.calls[0]).toHaveLength(1);
    expect(props.downloadFlattenImage.mock.calls[0][0]).toBe(true);
  });

  it('should trigger `autoPopulate` when autopolulate button is clicked', () => {
    const { props, autoPopulateButton } = setup();
    autoPopulateButton.simulate('click');
    expect(props.autoPopulate.mock.calls[0]).toHaveLength(0);
    expect(props.autoPopulate.mock.calls[0][0]).toBeUndefined();
  });

  describe('each props doing well', () => {
    const { props } = setup(0, 0, [], 0, 0, 0, 0);

    it('should get value `canvasWidth` as 0', () => {
      expect(props.canvasWidth).toBe(0);
    });

    it('should get value `canvasHeight` as 0', () => {
      expect(props.canvasHeight).toBe(0);
    });

    it('sholud get value `backgroundVertexNode` as empty array', () => {
      expect(Array.isArray(props.backgroundVertexNode)).toBe(true);
      expect(props.backgroundVertexNode).toHaveLength(0);
    });

    it('sholud get value `backgroundCellSize` as 0', () => {
      expect(props.backgroundCellSize).toBe(0);
    });

    it('sholud get value `backgroundVariance` as 0', () => {
      expect(props.backgroundVariance).toBe(0);
    });

    it('sholud get value `backgroundMaxCols` as 0', () => {
      expect(props.backgroundMaxCols).toBe(0);
    });

    it('sholud get value `backgroundMaxRows` as 0', () => {
      expect(props.backgroundMaxRows).toBe(0);
    });
  });

  describe('ref correctly should works correctly', () => {
    it('have to works', () => {
      const wrapper = mount(<Panel />);
      expect(wrapper.find('#setWidth')).toHaveLength(1);
      expect(wrapper.instance().setWidth).toBeTruthy();
    });
  });

  describe('editmode change should work correctly', () => {
    it('return true when target is checked', () => {
      const { component, props } = setup();
      let editmodeCheck = component.find('#editmode');
      editmodeCheck.simulate('change', {target: {checked: true}});
      expect(props.editMode.mock.calls[0][0]).toBe(true);
    });

    it('return true when target is unchecked', () => {
      const { component, props } = setup();
      let editmodeCheck = component.find('#editmode');
      editmodeCheck.simulate('change', {target: {checked: false}});
      expect(props.editMode.mock.calls[0][0]).toBe(false);
    });
  });

  describe('set `backgroundPoly` with debounce test', () => {
    it('cellsize changing', done => {
      const { component, props } = setup();
      const cellsizeSet = 60;
      const cellsizeInput = component.find('#cellsize');
      const onChangeSpy = jest.spyOn(component.instance(), 'handleAutoPopulateValueChange');
      component.update();
      cellsizeInput.simulate('change', {target: {value: cellsizeSet}}, 'cellsize');
      expect(onChangeSpy).toHaveBeenCalledWith(cellsizeSet, 'cellsize');
      setTimeout(() => {
        expect(props.setBackgroundPoly).toHaveBeenCalledWith(cellsizeSet, 'cellsize');
        done();
      }, 600);
    });

    it('variance changing', done => {
      const { component, props } = setup();
      const varianceSet = 0.5;
      const varianceInput = component.find('#variance');
      const onChangeSpy = jest.spyOn(component.instance(), 'handleAutoPopulateValueChange');
      component.update();
      varianceInput.simulate('change', {target: {value: varianceSet}}, 'variance');
      expect(onChangeSpy).toHaveBeenCalledWith(varianceSet, 'variance');
      setTimeout(() => {
        expect(props.setBackgroundPoly).toHaveBeenCalledWith(varianceSet, 'variance');
        done();
      }, 600);
    });
  });
});
