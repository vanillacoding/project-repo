import React from 'react';
import { shallow } from 'enzyme';
import CoverImageList from '../CoverImageList';

const navigation = {
  navigate: jest.fn(),
};

const cat = {
  name: '시리우스론',
  image: 'http://harrypotter.com/png',
  _id: '1523523222',
};

describe('CoverImageList', () => {
  it('should be called with myCatDetail when it is clicked', () => {
    const component = shallow(<CoverImageList navigation={navigation} cat={cat} />);
    component.find('TouchableOpacity').at(0).simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('myCatDetail', { index: '1523523222' });
    expect(component.find('Text').at(0).props().children).toBe('시리우스론');
  });
});
