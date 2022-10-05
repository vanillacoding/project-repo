import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '../test/test-utils';
import PlantPage from './PlantPage';

describe('<PlantPage>', () => {
  afterEach(() => cleanup());

  it('matches snapshot', () => {
    const { container } = render(<PlantPage />);
    expect(container).toMatchSnapshot();
  });

  it('should load and render plant canvas after fetch all plant', async () => {
    const { getByTestId, getByText } = render(<PlantPage />);
    expect(getByText('식물정보 불러오는중...')).toBeInTheDocument();

    await waitFor(() => getByTestId('canvas'));

    expect(getByTestId('canvas')).toBeInTheDocument();
    expect(getByText('mockWeatherName')).toBeInTheDocument();
  });

  it('should render time traveling canvas after clicking start time traveling button', async () => {
    const { getByTestId, getByText, getByRole } = render(<PlantPage />);
    await waitFor(() => getByTestId('canvas'));

    fireEvent.click(getByRole('button', { name: 'Start time traveling' }));
    expect(getByText('Stop time traveling')).toBeInTheDocument();
    expect(getByTestId('travelCanvas')).toBeInTheDocument();
  });
});
