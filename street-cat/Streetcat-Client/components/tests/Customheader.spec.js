import React from 'react';
import  { shallow } from 'enzyme';
import CustomHeader from '../CustomHeader';

const navigation = {
  navigate: jest.fn(),
};

let isModifying = false;
const setIsModifying = (value) => {
  isModifying = value;
};

let isFounder = false;

const sendDeleteRequest = jest.fn();

describe('CustomHeader', () => {
  it('Third View should not render children when isFounder is false', () => {
    const component = shallow(
      <CustomHeader
        navigation={navigation}
        setIsModifying={setIsModifying}
        isFounder={isFounder}
        sendDeleteRequest={sendDeleteRequest}
      />
    );

    expect(component.find('BackButton').length).toBe(1);
    expect(component.find('View').at(2).props().children).toBe(false);
  });

  it('Third View should render children when isFounder is true', () => {
    isFounder = true;
    const component = shallow(
      <CustomHeader
        navigation={navigation}
        setIsModifying={setIsModifying}
        isFounder={isFounder}
        sendDeleteRequest={sendDeleteRequest}
      />
    );

    component.find('Styled(Button)').at(0).simulate('press');
    expect(isModifying).toBe(true);
    expect(component.find('Text').at(0).props().children).toBe('수정');
    expect(component.find('Text').at(1).props().children).toBe('삭제');
    expect(component.find('View').at(2).props().children).toBeTruthy();
    component.find('Styled(Button)').at(1).simulate('press');
    expect(sendDeleteRequest).toHaveBeenCalledTimes(1);
  });
});
