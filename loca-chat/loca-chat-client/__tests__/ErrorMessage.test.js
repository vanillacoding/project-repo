import 'react-native';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorMessage from '../components/ErrorMessage';

configure({ adapter: new Adapter() });

const mockData = 'error!!!';

describe('<ErrorMessage />', () => {
  it('should render error message', () => {
    const wrapper = shallow(<ErrorMessage errorMessage={mockData} />);
    const errorText = wrapper.find('Text').first().render().text();

    expect(errorText).toBe(mockData);
  });
});
