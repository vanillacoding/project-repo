import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../components/Message';
import moment from 'moment';

configure({ adapter: new Adapter() });

const date = new Date();
const mockData = {
  nickname: 'test nickname',
  imageUrl: 'url',
  message: 'test message',
  date
};

describe('<Message />', () => {
  it('should render loding component', () => {
    const wrapper = shallow(
      <Message
        nickname={mockData.nickname}
        imageUrl={mockData.url}
        message={mockData.message}
        date={mockData.date}
      />
    );
    const nicknameText = wrapper.find('Text').at(0).render().text();
    const messageText = wrapper.find('Text').at(2).render().text();
    const dateText = wrapper.find('Text').at(1).render().text();

    expect(nicknameText).toBe(mockData.nickname);
    expect(messageText).toBe(mockData.message);
    expect(dateText).toBe(moment(mockData.date).format('YYYY.MM.DD h:mm a'));
  });
});
