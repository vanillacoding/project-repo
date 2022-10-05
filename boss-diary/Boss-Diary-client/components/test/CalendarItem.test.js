import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarItem from '../CalendarItem.js';
import { Card, CardItem, Text } from 'native-base';

Enzyme.configure({ adapter: new Adapter() });

const item = {
  title: 'test',
  body: 'test body',
  time: 'test time'
};

const wrapper = shallow(<CalendarItem item={item} />);

describe('CalendarItem', () => {
  it('should render Card component', () => {
    expect(wrapper.find(Card).length).toBe(1);
  });

  it('should render three CardItem and Text components', () => {
    expect(wrapper.find(CardItem).length).toBe(3);
    expect(wrapper.find(Text).length).toBe(3);
  });

  it('should render item prop each in Text', () => {
    expect(
      wrapper.contains(<Text>{item.title}</Text>)
    ).toBe(true);

    expect(
      wrapper.contains(<Text>{item.body}</Text>)
    ).toBe(true);

    expect(
      wrapper.contains(<Text>{item.time}</Text>)
    ).toBe(true);
  });
});
