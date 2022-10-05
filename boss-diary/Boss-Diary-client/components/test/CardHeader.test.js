import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardHeader from '../CardHeader.js'
import {
  CardItem,
  Thumbnail,
  Text,
} from 'native-base';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  photo: 'http://',
  title: 'test',
  note: null
};

const propsWithNote = {
  photo: 'http://',
  title: 'test',
  note: new Date().toISOString()
};

const wrapper = shallow(<CardHeader {...props} />);
const wrapperWithNote = shallow(<CardHeader {...propsWithNote} />);

describe('CardHeader', () => {
  it('should render CardItem component', () => {
    expect(wrapper.find(CardItem).length).toBe(1);
  });

  it('should render Thumnail of source uri from photo prop', () => {
    expect(
      wrapper.find(Thumbnail).prop('source').uri
    ).toBe(props.photo);
  });

  it('should render title prop in Text component', () => {
    expect(wrapper.find(Text).length).toBe(1);

    expect(
      wrapper.contains(<Text>{props.title}</Text>)
    ).toBe(true);
  });

  it('should render Text dynamically depends on note prop', () => {
    expect(wrapper.find(Text).length).toBe(1);
    expect(wrapperWithNote.find(Text).length).toBe(2);
  });
});
