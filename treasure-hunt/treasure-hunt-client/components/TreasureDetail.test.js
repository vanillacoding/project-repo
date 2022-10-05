import React from 'react';
import { shallow } from 'enzyme';
import TreasureDetail from './TreasureDetail';

describe('TreasureDetail', () => {
  it('should be called navigate with urlList inforamtion if magnifying-glass icon is pressed', () => {
    const mockDate = {
      registered_by: {
        name: 'minsun'
      },
      name: '파리 교통 패스',
      expiration: 123456436,
      location_pictures_url: ['www.eae.com/sek/seret', 'www.eae.com/sek/seresst'],
      location: [37.505978, 127.0591311],
      description: '인천공항 7번출구 왼쪽 소화기 뒤에 있습니다.',
      country: 'United States',
      category: 'transportaion',
      is_hunting: false,
    };

    const createTestProps = (props) => ({
      navigation: {
        navigate: jest.fn(),
      },
      ...props,
    });
    const props = createTestProps({});
    const treasureDetail = shallow(
      <TreasureDetail
        {...props}
        selectedTreasure={mockDate}
      />
    );

    expect(treasureDetail.find('Icon')).toHaveLength(1);
    treasureDetail.find('Icon').simulate('press');
    expect(props.navigation.navigate)
      .toBeCalledWith('ShowPictures', { urlList: mockDate.location_pictures_url, });
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });
});
