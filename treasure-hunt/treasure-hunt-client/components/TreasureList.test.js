import React from 'react';
import { shallow } from 'enzyme';
import TreasureList from './TreasureList';

describe('TreasureList', () => {
  const mockDate = {
    name: 'apple',
    country: 'USA',
    expiration: 123467890,
    onCountry: () => {},
  };

  it('should be called onTreasure function asynchronously if treasue name button is clicked', () => {
    const mockObject = { name: '' };
    const treasureList = shallow(
      <TreasureList
        {...mockDate}
        page={'generalPage'}
        id={'aelrka12ejr'}
        onTreasure={(id) => {
          setTimeout(() => {
            mockObject.name = id;
          }, 1000);
        }}
      />
    );

    const nameCategory = treasureList.find('TouchableOpacity').at(1);
    nameCategory.simulate('press');
    setTimeout(() => {
      expect(mockObject.name).toBe('aelrka12ejr');
    }, 1000);
  });

  it('should be icon treasure-chest if it is hunting page and treasures is hunted', () => {
    const treasureList = shallow(
      <TreasureList
        {...mockDate}
        id={'aelrka12ejr'}
        is_hunting={true}
        page={'hunting'}
      />
    );
    expect(treasureList.find('Icon').at(0).props().name).toBe('treasure-chest');
  });
});
