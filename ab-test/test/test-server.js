process.env.NODE_ENV = 'test';

/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server/index');
const Project = require('../src/server/models/Project');

const should = chai.should();

chai.use(chaiHttp);

describe('Projects', () => {
  beforeEach((done) => {
    if (process.env.NODE_ENV === 'test') {
      Project.deleteMany({}, (err) => {
        done();
      });
    }
  });

  describe('GET project', () => {
    it('should list all projects on /projects GET', (done) => {
      chai.request(server)
        .get('/api/projects')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('POST project', () => {
    it('should POST a project', (done) => {
      chai.request(server)
        .post('/api/projects/testNameSample')
        .send({ origin: 'www.test.com' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('origin');
          done();
        });
    });
  });
});
