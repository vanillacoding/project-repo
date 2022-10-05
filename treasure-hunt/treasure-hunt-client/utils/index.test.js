import { Dimensions } from 'react-native';
import {
  caculateLocation,
  checkValidation,
  makeExpirationToString,
} from './index';
import message from '../constants/message';

const screen = Dimensions.get('window');
const mockLocation = {
  latitude: 37.5059724,
  longitude: 127.0591333,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * screen.width / screen.height
};

describe('<function caculateLocation>', () => {
  const latitude = 37.5059724;
  const longitude = 127.0591333;
  it('should be returend location information with calculated latitudeDelta, longitudeDelta', () => {
    expect(caculateLocation(latitude, longitude, screen)).toMatchObject(mockLocation);
  });
});

describe('<function checkValidation>', () => {
  let tempAlert;
  beforeEach(() => {
    tempAlert = window.alert;
    window.alert = jest.fn();
  });
  afterEach(() => {
    window.alert = tempAlert;
  });

  describe('should be returned a appropriate value for the case', () => {
    it('(Case 1) No category : Return false, Alert noneCategory', () => {
      expect(checkValidation('', 'country', 'name', 'description', ['uriList1', 'uriList2'], mockLocation)).toBe(false);
      expect(window.alert).toBeCalledWith(message.noneCategory);
    });

    it('(Case 2) No country : Return false, Alert noneCountry', () => {
      expect(checkValidation('category', '', 'name', 'description', ['uriList1', 'uriList2'], mockLocation)).toBe(false);
      expect(window.alert).toBeCalledWith(message.noneCountry);
    });

    it('(Case 3) No country : Return false, Alert noneName', () => {
      expect(checkValidation('category', 'country', '', 'description', ['uriList1', 'uriList2'], mockLocation)).toBe(false);
      expect(window.alert).toBeCalledWith(message.noneName);
    });

    it('(Case 4) No description : Return false, Alert noneDescription', () => {
      expect(checkValidation('category', 'country', 'name', '', ['uriList1', 'uriList2'], mockLocation)).toBe(false);
      expect(window.alert).toBeCalledWith(message.noneDescription);
    });

    it('(Case 5) empty uriList : Return false, Alert nonePictures', () => {
      expect(checkValidation('category', 'country', 'name', 'description', [], mockLocation)).toBe(false);
      expect(window.alert).toBeCalledWith(message.nonePictures);
    });

    it('(Case 6) No markedLocation : Return false, Alert noneMap', () => {
      expect(checkValidation('category', 'country', 'name', 'description', ['uriList1', 'uriList2'], '')).toBe(false);
      expect(window.alert).toBeCalledWith(message.noneMap);
    });

    it('(Case 7) valid case : Return true', () => {
      expect(checkValidation('category', 'country', 'name', 'description', ['uriList1', 'uriList2'], mockLocation)).toBe(true);
    });
  });
});

describe('<function makeExpirationToString>', () => {
  it('should be returend a date string for the given timestap.', () => {
    expect(makeExpirationToString(1586767599680)).toBe('2020/4/13');
    expect(makeExpirationToString(1588518000000)).toBe('2020/5/4');
  });
});
