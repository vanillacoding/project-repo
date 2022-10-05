import country from './country';

const actionOne = {
  type: 'SET_COUNTRY_ID',
  countryId: '1'
};

const actionTwo = {
  type: 'SET_COUNTRY_ID',
  countryId: '2'
};

describe('Country reducer', () => {
  it('Country ID entered should be returned', () => {
    expect(country('', actionOne)).toEqual('1');
  });

  it('Country ID entered should be returned', () => {
    expect(country('1', actionTwo)).toEqual('2');
  });
});
