import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const MOCK_LAT = 'MOCK_LAT';
export const MOCK_LNG = 'MOCK_LNG';

const mockGeolocation = {
  getCurrentPosition: (callback) => {
    const FAKE_POSITION = {
      coords: {
        latitude: MOCK_LAT,
        longitude: MOCK_LNG,
      },
    };

    callback(FAKE_POSITION, null);
  },
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
global.EMIT = jest.fn();
global.ON = jest.fn();
global.OFF = jest.fn();
