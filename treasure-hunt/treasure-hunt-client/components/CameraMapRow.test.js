import React from 'react';
import { shallow } from 'enzyme';
import CameraMapRow from './CameraMapRow';
import message from '../constants/message';

describe('CameraMapRow', () => {
  let tempAlert;
  beforeEach(() => {
    tempAlert = window.alert;
    window.alert = jest.fn();
  });
  afterEach(() => {
    window.alert = tempAlert;
  });

  it('should alert message if uriList.length is three', () => {
    const cameraMapRow = shallow(
      <CameraMapRow
        uriList={[1, 2, 3]}
        dispatch={() => {}}
        action={() => {}}
        location={{}}
        hasPermissionCamera={true}
        hasPermissionLocation={true}
      />
    );

    cameraMapRow.find('[testID="Camera"]').simulate('press');
    expect(window.alert).toBeCalledWith(message.maxImg);
  });

  it('should alert message if hasPermissionCamera is false', () => {
    const cameraMapRow = shallow(
      <CameraMapRow
        uriList={[1, 2]}
        dispatch={() => {}}
        action={() => {}}
        location={{}}
        hasPermissionCamera={false}
        hasPermissionLocation={true}
      />
    );

    cameraMapRow.find('[testID="Gallery"]').simulate('press');
    expect(window.alert).toBeCalledWith(message.deniedPermission);
  });

  it('should call with navigate ShowMap and location information if map is pressed', () => {
    const createTestProps = (props) => ({
      navigation: {
        navigate: jest.fn(),
      },
      ...props,
    });
    const props = createTestProps({});
    const cameraMapRow = shallow(
      <CameraMapRow
        {...props}
        uriList={[1, 2]}
        dispatch={() => {}}
        action={() => {}}
        location={{ latitude: 36 }}
        hasPermissionCamera={true}
        hasPermissionLocation={true}
      />
    );

    cameraMapRow.find('[testID="Map"]').simulate('press');
    expect(props.navigation.navigate)
      .toBeCalledWith('ShowMap', { location: { latitude: 36 } });
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });
});
