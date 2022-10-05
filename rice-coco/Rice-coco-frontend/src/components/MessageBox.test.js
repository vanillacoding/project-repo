import React from 'react';
import { shallow } from 'enzyme';
import MessageBox from './MessageBox';
import { StyledText, UserProfile, MessageContainer } from '../shared/index';
import { COLOR } from '../constants/color';

describe('MessageBox', () => {
  it('should render only the first character of nickname and message by props', () => {
    const FAKE_MESSAGE = '안녕하세요';
    const FAKE_NICKNAME = '병아리';

    const mockData = {
      isUser: true,
      message: FAKE_MESSAGE,
      nickname: FAKE_NICKNAME,
    };

    const wrapper = shallow(<MessageBox {...mockData} />);
    const message = wrapper.find(StyledText);
    const nickname = wrapper.find(UserProfile).children().children();

    expect(nickname.text()).toBe(FAKE_NICKNAME[0]);
    expect(message.text()).toBe(FAKE_MESSAGE);
  });

  it('shoud contain diffrent color whether box is made by user or partner', () => {
    const FAKE_MESSAGE = '안녕하세요';
    const FAKE_NICKNAME = '병아리';

    let mockData = {
      isUser: true,
      message: FAKE_MESSAGE,
      nickname: FAKE_NICKNAME,
    };

    let wrapper = shallow(<MessageBox {...mockData} />);
    let messageContainer = wrapper.find(MessageContainer);

    expect(messageContainer.props().color).toBe(COLOR.LIGHT_GRAY);

    mockData = {
      isUser: false,
      message: FAKE_MESSAGE,
      nickname: FAKE_NICKNAME,
    };

    wrapper = shallow(<MessageBox {...mockData} />);
    messageContainer = wrapper.find(MessageContainer);

    expect(messageContainer.props().color).toBe(COLOR.THEME_COLOR);
  });
});
