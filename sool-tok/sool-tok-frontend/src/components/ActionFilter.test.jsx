import React from 'react';
import { mount } from 'enzyme';
import ActionFilter from './ActionFilter';

describe('renders correctly', () => {
  const IS_FILTER_ON = true;
  const ROOM_ID = '123123';
  const wrapper = mount(
    <ActionFilter
      roomId={ROOM_ID}
      isFilterOn={IS_FILTER_ON}
    />,
  );

  it('should be contain close button', () => {
   const actionButton = wrapper.findWhere(node =>
    node.type() === 'button',
   );

   actionButton.simulate('click');

   expect(wrapper.containsMatchingElement(<div />));
   expect(actionButton.text()).toBe('❌');
  });
});
