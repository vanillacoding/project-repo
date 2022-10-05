import React from 'react';
import { shallow } from 'enzyme';
import Comment from '../Comment';

const comments = [{ comment: '너무귀여워' }];
const userId = '123';
const cat = '야옹이'

const emptyComments  = [];

describe('BackButton', () => {
  it('should not render Commentlist when comments are empty', () => {
    const component = shallow(<Comment comments={emptyComments} />);
    const input = component.find('TextInput');
    input.simulate('changeText', '너무귀엽냥');
    expect(component.find('View').at(0).props().children[0].length).toBe(0);
    expect(component.find('TextInput').props().value).toBe('너무귀엽냥')
  });

  it('should render Commentlist when comments are not empty', () => {
    const component = shallow(
      <Comment 
        comments={comments} 
        userId={userId} 
        cat={cat}
      />
    );
    const CommentList = component.find('CommentList');
    expect(component.find('View').at(0).props().children[0].length).toBeTruthy();
    expect(CommentList.props().comment).toBeTruthy();
    expect(CommentList.props().userId).toBe('123');
    expect(CommentList.props().cat).toBe('야옹이');
  });
});
