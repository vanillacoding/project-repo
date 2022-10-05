import React from 'react';
import { mount } from 'enzyme';
import ErrorBox from './ErrorBox';

describe('renders correctly', () => {
  const message = 'message';
  const text = 'text';
  const isMatched = (<h1>{message}</h1>);

  const wrapper = mount(
    <ErrorBox message={message} text={text}>
      {isMatched}
    </ErrorBox>,
  );

  it('should be render message', () => {
    expect(wrapper.containsMatchingElement(isMatched));
  });

  it('should paint color', () => {
    expect(wrapper.prop('text')).toEqual(text);
  });

  it('should render ond <h1> with message', () => {
    expect(wrapper.find('h1').text()).toEqual(message);
  });
});
