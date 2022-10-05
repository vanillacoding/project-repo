import React from 'react';
import { shallow } from 'enzyme';
import LogOutButton from '../LogOutButton';

let isLoggedOut = false;

describe('LogOutButton', () => {
  it('should change isLoggedOut state when it is clicked', () => {
    const component = shallow(
      <LogOutButton 
        proceedLogout={() => {
          isLoggedOut = true;
        }} 
      />
    );
    component.find('Styled(Icon)').at(0).simulate('press');
    expect(component.find('Styled(Icon)').length).toBe(1);
    expect(isLoggedOut).toBe(true);
  });
});
