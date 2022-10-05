import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../components/Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  it('should render title', () => {
    const wrapper = shallow(<Modal />);
    const titleText = wrapper.find('Text').first().render().text();

    expect(titleText).toBe('채팅방 이름을 입력해주세요');
  });

  it('should be close when cencel button click', () => {
    const mockHideModal = jest.fn();
    const mockSetErrorMessage = jest.fn();
    const wrapper = shallow(
      <Modal hideModal={mockHideModal} setErrorMessage={mockSetErrorMessage} />
    );
    const cencelButton = wrapper.find('Text').at(2).parent();

    cencelButton.simulate('press');

    expect(mockHideModal.mock.calls.length).toBe(1);
  });

  it('should render error message when error is occurred', () => {
    const wrapper = shallow(<Modal errorMessage="error!!!" />);
    const errorMessage = wrapper.find('ErrorMessage').first().render().text();

    expect(errorMessage).toBe('error!!!');
  });
});
