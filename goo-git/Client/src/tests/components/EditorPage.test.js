import React from 'react';
import { mount } from 'enzyme';
import EditorPage from '../../pages/EditorPage';
import EditorPageHeader from '../../components/EditorPageHeader';
import ShareButton from '../../components/ShareButton';

describe('EditorPage should only show save button after Editor text has been changed', () => {
  const wrapper = mount(<EditorPage />);

  it('should not display save button initially', () => {
    expect(wrapper.find(EditorPageHeader).length).toEqual(1);
    expect(wrapper.find(ShareButton).length).toEqual(0);
  });
});
