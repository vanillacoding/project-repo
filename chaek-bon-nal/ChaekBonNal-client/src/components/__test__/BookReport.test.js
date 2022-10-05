import React from 'react';
import BookReport from '../BookReport';
import { shallow, mount } from 'enzyme';

describe('<BookReport />', () => {
  let initialProps;
  let wrapper;

  beforeEach(() => {
    initialProps = {
      page: {
        book_info: {
          title: 'book_title',
          author: 'book_author',
          link: 'link',
          image: 'image',
          publisher: 'publisher'
        },
        quote: 'quote',
        author: {
          email: 'email',
          imageUrl: 'avartar_image_url',
          name: 'name',
        },
        text: 'text',
        title: 'title',
        image_url: 'bookReport_image_url',
      },
      index: 'index_number',
      setIsModalOpened: jest.fn(),
      setBookReportId: jest.fn()
    };

    wrapper = shallow(
      <BookReport
        {...initialProps}
      />
    );
  })

  it('Should render BookReport component without errors', () => {
    expect(wrapper.find('article')).toHaveLength(1);
    expect(wrapper.find('.leftContainer')).toHaveLength(1);
    expect(wrapper.find('.rightContainer')).toHaveLength(1);
    expect(wrapper.find('.text').text()).toBe(initialProps.page.text);
    expect(wrapper.find('.name').text()).toBe(initialProps.page.author.name);
    expect(wrapper.find('h1').text()).toBe(initialProps.page.title);
  });

  it('Should open modal if user click article', () => {
    wrapper.find('article').simulate('click')
    expect(initialProps.setIsModalOpened).toHaveBeenCalled();
  })

  it('Should calls setBookReportId function if user click article', () => {
    wrapper.find('article').simulate('click')
    expect(initialProps.setBookReportId).toHaveBeenCalled();
  })
})

// page: {
//   book_info: {
//     title: 'book_title',
//     author: 'book_author',
//     link: 'link',
//     image: 'image',
//     publisher: 'publisher'
//   },
//   comments: ['objectId'],
//   _id: 'objectId',
//   quote: 'quote',
//   author: {
//     choosen_category: ['objectId'],
//     bookmarks: ['objectId'],
//     _id: 'objectId',
//     email: 'email',
//     imageUrl: 'avartar_image_url',
//     name: 'name',
//   },
//   text: 'text',
//   title: 'title',
//   image_url: 'bookReport_image_url',
// },
// index: 'index_number',
// setIsModalOpened: jest.fn(),
// setBookReportId: jest.fn()
// };