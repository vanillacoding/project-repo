import React from 'react';
import { shallow } from 'enzyme';
import Pictures from './Pictures';

describe('Pictures', () => {
  it('should have dummys if uriList length is less than three', () => {
    const pictures = shallow(
      <Pictures
        uriList={['www.abc.com/abc.jpg', 'www.abc.com/bd3.jpg']}
        style={{}}
        isInput={true}
      />
    );
    expect(pictures.find('View')).toHaveLength(1);
    expect(pictures.find('Image')).toHaveLength(2);
  });

  it('should has not no dummy even if uriList length is less than three, if isInput is false', () => {
    const pictures = shallow(
      <Pictures
        uriList={['www.abc.com/abc.jpg', 'www.abc.com/bd3.jpg']}
        style={{}}
        isInput={false}
      />
    );
    expect(pictures.find('View')).toHaveLength(0);
    expect(pictures.find('Image')).toHaveLength(2);
  });
});
