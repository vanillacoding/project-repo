import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

const actions = {
  comment: {
    likes: [],
    hashtags: [
      { _id: '5e95d86a2f25182fa71fff76', hashtag: '#캐나다워홀' },
      { _id: '5e95d86a2f25182fa71fff77', hashtag: '#토론토' },
      { _id: '5e95d86a2f25182fa71fff78', hashtag: '#솔직후기' }
    ],
    _id: '5e95d86a2f25182fa71fff79',
    author: {
      _id: 'qwertyuiopasdfghjklzxcvbnm',
      email: 'test@gmail.com',
      picture_url: 'https://picture.com/photos/1',
      name: 'test user'
    },
    contents: '처음엔 캐나다 워홀에 대해 고민이 많았는데, 전혀 후회하지 않습니다! 영어도 많이 늘었어요 #토론토 #캐나다워홀 #솔직후기',
    created: '2020-04-14T15:36:10.258Z'
  },
  user: {
    id: 'qwertyuiopasdfghjklzxcvbnm2',
    email: 'test2@gmail.com',
    picture: 'https://picture.com/photos/2',
    name: 'test user2'
  }
};
const wrapper = shallow(<Comment {...actions} />);

describe('<Comment />', () => {
  it('Comment should have a unique ID', () => {
    expect(wrapper.find('.comment').prop('id')).toEqual(actions.comment._id);
  });

  it('If the comment author and the logged-in user are different, delete button should not be rendered', () => {
    expect(wrapper.find('.button-delete')).toHaveLength(0);
  });
});
