import React from 'react';
import  { shallow } from 'enzyme';
import Profile from '../Profile';

const name = 'Micky'

describe('Profile', () => {
  
  it('Name prop should be sent to Text element', () => {
    const component = shallow(<Profile name={name} />);
    expect(component.find('Text').prop('children')).toBe('Micky');
    expect(component.find('Text').length).toBe(1);
  });
});
