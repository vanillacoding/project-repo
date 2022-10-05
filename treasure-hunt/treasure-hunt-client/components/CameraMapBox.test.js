import React from 'react';
import { shallow } from 'enzyme';
import CameraMapBox from './CameraMapBox';

describe('CameraMapBox', () => {
  it('should call with onPress function', () => {
    const mockObj = { camera: false };
    const onPressCamera = () => mockObj.camera = true;
    const camera = shallow(
      <CameraMapBox
        type="camera"
        onPress={onPressCamera}
      />
    );
    expect(mockObj.camera).toBe(false);
    camera.simulate('press');
    expect(mockObj.camera).toBe(true);
  });
});
