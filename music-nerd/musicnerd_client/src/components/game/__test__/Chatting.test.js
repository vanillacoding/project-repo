import React from 'react';
import { mount } from 'enzyme';
import Chatting from '../Chatting';

describe('<Chatting /> component', () => {
  const mockSetMessage = jest.fn();
  const mockSubmitMessage = jest.fn();
  const props = {
    message: 'random chat message',
    setMessage: mockSetMessage,
    onSendButtonClick: mockSubmitMessage,
    children: [{
      username: 'mockuser',
      message: 'mock message'
    }]
  };

  it('should render form', () => {
    const wrapper = mount(<Chatting {...props} />);
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    expect(form.find('input')).toHaveLength(1);
    expect(form.find('button')).toHaveLength(1);

    form.find('button').simulate('click');
    expect(mockSubmitMessage).toHaveBeenCalledTimes(1);
  });
});
