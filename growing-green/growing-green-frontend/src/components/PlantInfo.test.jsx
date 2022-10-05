import React from 'react';
import PlantInfo from './PlantInfo';
import { render } from '../test/test-utils';

describe('<PlantInfo>', () => {
  const mockPlant = {
    name: '장미',
    scientificName: 'Rosaceae 로사케아이',
    species: '장미과',
    watering: 5,
    isSunPlant: true,
  };

  it('matches snapshot', () => {
    const { container } = render(<PlantInfo plant={mockPlant} />);
    expect(container).toMatchSnapshot();
  });

  it('should render plant information', () => {
    const { getByText } = render(<PlantInfo plant={mockPlant} />);
    expect(getByText(/식물 정보/i)).toBeInTheDocument();
    expect(getByText(`이름: ${mockPlant.name}`)).toBeInTheDocument();
    expect(getByText(`학명: ${mockPlant.scientificName}`)).toBeInTheDocument();
    expect(getByText(`과: ${mockPlant.species}`)).toBeInTheDocument();
    expect(getByText(`물주기: ${mockPlant.watering}일`)).toBeInTheDocument();
    expect(getByText(/양지 식물/i)).toBeInTheDocument();
  });
});
