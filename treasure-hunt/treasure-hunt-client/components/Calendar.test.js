import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
  let tempAlert;
  beforeEach(() => {
    tempAlert = window.alert;
    window.alert = jest.fn();
  });
  afterEach(() => {
    window.alert = tempAlert;
  });

  it('should call setExpiration function with selected expiration if calendar date is changed', () => {
    const timestamp = new Date().getTime() + 1000000;
    const onSetExpiration = jest.fn();
    const calendar = shallow(
      <Calendar
        setShowDate={jest.fn()}
        setExpiration={onSetExpiration}
      />
    );

    calendar.find('Picker').simulate('change', { nativeEvent: { timestamp } });
    expect(onSetExpiration).toBeCalledWith(timestamp);
  });
});
