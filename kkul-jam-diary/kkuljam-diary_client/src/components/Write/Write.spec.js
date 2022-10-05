import React from 'react';
import { shallow } from 'enzyme';
import Write from './Write';

describe('<Write />', () => {
  let initialProps;
  let wrapper;

  beforeEach(() => {
    initialProps = {
      sleep: {
        createdAt: '2020-04-14T22:58:59.000Z',
        wakeUpTime: '2020-04-08T23:22:59.000Z',
        bedTime: '2020-04-08T17:34:00.000Z',
        sleepDuration: '5:48',
        _id: '5e96ae153cdec2c9024e3c83'
      },
      saveDiary: jest.fn()
    };
    wrapper = shallow(
      <Write {...initialProps} />
    );
  });

  it('renders Write page', () => {
    expect(wrapper.find('.sleepInfo')).toHaveLength(1);
    expect(wrapper.find('.date')).toHaveLength(1);
    expect(wrapper.find('.hours')).toHaveLength(1);
    expect(wrapper.find('.contents')).toHaveLength(1);
    expect(wrapper.find('.submit')).toHaveLength(1);
  });
});
