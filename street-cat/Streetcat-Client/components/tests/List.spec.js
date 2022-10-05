import React from 'react';
import  { shallow } from 'enzyme';
import List from '../List';
import { Text } from 'react-native';

const cat = {
  name: '헐마이오니',
  likes: [],
  image: 'test-image',
  _id: 'testid',
};

const styles = {
  text: {
    fontSize: 20, 
    padding: 5,
  }, 
};

const navigation = {
  navigate: jest.fn(),
};

describe('List', () => {
  it('Cat props should be sent this componenet and navigation should be called with Detail screen', () => {
    const component = shallow(<List cat={cat} navigation={navigation} />);
    component.find('TouchableOpacity').at(0).simulate('press');
    expect(
      component.contains(
        <Text style={styles.text}>냥이이름: {cat.name}</Text>
      )
    ).toBe(true);
    expect(
      component.contains(
        <Text style={styles.text}>좋아요: {cat.likes.length}</Text>
      )
    ).toBe(true);
    expect(navigation.navigate).toHaveBeenCalledWith('Detail', { index: cat._id });
  });
});
