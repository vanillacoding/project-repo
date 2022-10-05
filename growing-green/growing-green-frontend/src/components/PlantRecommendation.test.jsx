import React from 'react';
import PlantRecommendation from './PlantRecommendation';
import { render } from '../test/test-utils';
import { mockPlantNameList } from '../test/data';

describe('<PlantRecommendation>', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <PlantRecommendation plantsNames={mockPlantNameList.data} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render recommended plant names', () => {
    const { getByText } = render(
      <PlantRecommendation plantsNames={mockPlantNameList.data} />,
    );
    expect(
      getByText(/사용자들이 가장 많이 키우는 식물 TOP 5/i),
    ).toBeInTheDocument();
    mockPlantNameList.data.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
