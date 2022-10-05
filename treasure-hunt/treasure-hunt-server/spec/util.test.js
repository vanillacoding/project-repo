const { expect } = require('chai');
const { checkValidation, processTreasureList } = require('../util');
const { errorMsg } = require('../constants');

describe('<function checkValidation>', () => {
  describe('should be returned a appropriate value for the case', () => {
    const mockData = {};
    beforeEach(() => {
      mockData.country = 'Korea';
      mockData.category = 'usim';
      mockData.name = 'apple';
      mockData.expiration = (new Date() + 10000000).toString();
      mockData.latitude = 100;
      mockData.longitude = 100;
      mockData.description = 'sample';
    });
    afterEach(() => {
      mockData.country = 'Korea';
      mockData.category = 'usim';
      mockData.name = 'apple';
      mockData.expiration = (new Date() + 10000000).toString();
      mockData.latitude = 100;
      mockData.longitude = 100;
      mockData.description = 'sample';
    });

    it('(Case 1) No country : Return noneCountry message', () => {
      mockData.country = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.noneCountry);
    });

    it('(Case 2) No category : Return invalidCategory message', () => {
      mockData.category = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.invalidCategory);
    });

    it('(Case 3) No name : Return noneName message', () => {
      mockData.name = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.noneName);
    });

    it('(Case 4) No expiration : Return invalidExpiration message', () => {
      mockData.expiration = (new Date() - 1000000).toString();
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.invalidExpiration);
    });

    it('(Case 5-1) No location : Return noneLocation message', () => {
      mockData.latitude = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.noneLocation);
    });

    it('(Case 5-2) No location : Return noneLocation message', () => {
      mockData.longitude = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.noneLocation);
    });

    it('(Case 6) No description : Return noneDescription message', () => {
      mockData.description = '';
      const result = checkValidation(mockData);
      expect(result.msg).to.eql(errorMsg.noneDescription);
    });
  });
});

describe('<function processTreasureList>', () => {
  const mockExpi = new Date().getTime() + 10000000;
  const mockData = [{
    _id: 'lajekxkw3ke12',
    registered_by: 'test',
    country: 'Korea',
    category: 'usim',
    name: 'apple',
    expiration: mockExpi,
    location: [100, 100],
    location_pictures_url: [
      'www.123.com/123.jpg',
      'www.456.com/456.jpg'
    ],
    description: 'sample',
    is_hunting: true,
    taken_by: 'wekfkjkl12345',
  }];

  it('should be processed with the necessary information.', () => {
    mockData.country = '';
    const result = processTreasureList(mockData);
    expect(result[0].name).to.eql('apple');
    expect(result[0].expiration).to.eql(mockExpi);
    expect(result[0].country).to.eql('Korea');
    expect(result[0].id).to.eql('lajekxkw3ke12');
    expect(result[0].is_hunting).to.eql(true);
    expect(result[0].location).to.eql(undefined);
    expect(result[0].taken_by).to.eql(undefined);
    expect(result[0].location_pictures_url).to.eql(undefined);
  });
});
