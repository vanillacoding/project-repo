import React from 'react';
import { shallow } from 'enzyme';
import PickerInput from './PickerInput';
import { Picker } from '@react-native-picker/picker';

describe('PickerInput', () => {
  const onChangeMock = jest.fn();
  const FAKE_CONTENT = '나이';
  const FAKE_CONTENT_OPTIONS = ['20대', '30대', '40대', '50대'];
  const mockData = {
    content: FAKE_CONTENT,
    onChange: onChangeMock,
    contentOptions: FAKE_CONTENT_OPTIONS,
  };

  const wrapper = shallow(<PickerInput {...mockData} />);
  const picker = wrapper.find(Picker);
  const pickerItems = wrapper.find(Picker.Item);
  it('should render reander value by props', () => {
    expect(picker.props().selectedValue).toBe(FAKE_CONTENT);
    expect(pickerItems.at(0).prop('value')).toBe(FAKE_CONTENT_OPTIONS[0]);
    expect(pickerItems.at(1).prop('value')).toBe(FAKE_CONTENT_OPTIONS[1]);
    expect(pickerItems.at(2).prop('value')).toBe(FAKE_CONTENT_OPTIONS[2]);
    expect(pickerItems.at(3).prop('value')).toBe(FAKE_CONTENT_OPTIONS[3]);
  });
  it('should called onChange function when value is changed', () => {
    picker.simulate('ValueChange');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    picker.simulate('ValueChange');
    picker.simulate('ValueChange');
    expect(onChangeMock).toHaveBeenCalledTimes(3);
  });
});
