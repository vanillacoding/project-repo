import React from 'react';
import { shallow, mount } from 'enzyme';
import Dictionary from './Dictionary';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

describe('Dictionary Component', () => {
  const props = {
    isLoggedIn: true,
    updateMyWords: () => {},
    onAddWordClick: () => {},
    dictionary: {
      word: 'sample word',
      results: [
        {
          definition: 'sample word',
          synonyms: ['sample word 1', 'sample word 2', 'sample word 3'],
        },
      ],
    },
  };

  const wrapper = mount(<Dictionary {...props} />);
  it('renders without crushing', () => {});
  xit('triggers handleAddButtonClick on Tooltip click', done => {
    const handleAddButtonClick = jest.fn();

    const tooltip = wrapper.find(Tooltip);
    // wrapper.forceUpdate();
    // wrapper.update();

    tooltip.simulate('click');
    expect(handleAddButtonClick).toHaveBeenCalledTimes(1);
  });
});
