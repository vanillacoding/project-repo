const api = require('../api'),
      chai = require('chai'),
      expect = chai.expect;

describe('api', () => {
  context('run', () => {
    it('should get column data correctly', () => {
      const testUrl = 'https://drive.google.com/uc?export=download&id=1j78fFH-IZUXnEmW0dNgOd9M2w64oU1zj';
      const testFeature = ['bathrooms'];
      const testLabel = 'price'
      const result = api.run(testUrl, testFeature, testLabel);

      result.then(res => {
        expect(res.point2[0][0]).to.equal(testFeature[0]);
        expect(res.point2[0][1]).to.equal(testLabel);
        expect(res.points.length).to.equal(21613);
      }).catch((err) => {
        console.log(err);
      });
    });
  }),
  context('getHeader', () => {
    it('should get column header correctly', () => {
      const testUrl = 'https://drive.google.com/uc?export=download&id=1j78fFH-IZUXnEmW0dNgOd9M2w64oU1zj';
      const result = api.getHeader(testUrl);

      result.then(res => {
        expect(res[2]).to.equal('price');
        expect(res.length).to.equal(21);
      }).catch((err) => {
        console.log(err);
      });
    });
  });
});
