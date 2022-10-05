import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import AdoptCard from '../../components/AdoptCard';

describe('AdoptCard component test', () => {
  it('renders correctly', () => {
    const data = {
      name: 'name',
      ownerName: 'owner name'
    };
    const tree = renderer.create(<AdoptCard data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows text and username of data prop', async () => {
    const data = {
      name: 'name',
      ownerName: 'owner name'
    };

    const { getByText } = render(<AdoptCard data={data} />);
    const isNameExists = getByText(data.name);
    const isOwnerNameExists = getByText(`${data.ownerName}님`);

    expect(isNameExists).toBeTruthy();
    expect(isOwnerNameExists).toBeTruthy();
  });
});
