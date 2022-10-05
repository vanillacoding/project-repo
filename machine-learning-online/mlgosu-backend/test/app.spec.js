const request = require('supertest');
      app = require('../app');

describe('app', () => {
  context('/POST', () => {
    it('POST /api/url should catch error status', (done) => {
      request(app)
        .post('/api/url')
        .send({ name: 'pyungkyu' })
        .expect(400)
        .end((err, res) => {
          console.log(err);
          done();
        });
    }),
    it('POST /api/account/url get error message correctly', (done) => {
      request(app)
        .post('/api/account/url')
        .send({ name: 'pyungkyu' })
        .expect(400)
        .expect('error occured')
        .end((err, res) => {
          console.log(err);
          done();
        });
    });
  });
});
