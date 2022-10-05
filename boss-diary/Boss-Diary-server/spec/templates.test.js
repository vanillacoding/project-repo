const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');

const User = require('../models/User');
const Template = require('../models/Template');

require('dotenv').config();

describe('/api/templates', function() {
  this.timeout(20000);
  const mongoose = require('mongoose');
  const db = mongoose.connection;

  const mockTemplates = require('./templates.json');

  let accessToken;
  let storedTemplates;

  const createUser = async() => {
    const userData = await new User({
      email: 'test@test.com',
      name: 'testA',
      profile_photo: 'http://ddd',
      resports: [],
      templates: [],
      approval_requests: []
    }).save();

    accessToken = jwt.sign(
      {
        email: 'test@test.com',
        name: 'testA',
        user_id: userData._id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );
  };

  const storeTemplates = async() => {
    for (let i = 0; i < mockTemplates.length; i++) {
      await new Template(mockTemplates[i]).save();
    }
  };

  const fetchAllTemplates = done => {
    storeTemplates().then(() => {
      Template.find().lean().exec(function (err, templates) {
        if (err) return done(err);
        storedTemplates = JSON.parse(JSON.stringify(templates));
        done();
      });
    });
  };

  const deleteAllData = done => {
    User.deleteMany({}, err => {
      if (err) return done(err);

      Template.deleteMany({}, err => {
        if (err) return done(err);

        done();
      });
    });
  };

  before(done => {
    (async function checkDatabaseConnection() {
      if (db.readyState === 1) {
        await createUser();
        fetchAllTemplates(done);
        return;
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  after(done => {
    return deleteAllData(done);
  });

  /*

  Get All Templates

  */

  describe('GET /api/templates', () => {
    it('should not return any templates with invalid token', done => {
      request(app)
        .get('/api/templates')
        .set({ Authorization: 'Bearer fake', 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.exist;
          expect(res.body.result).to.eql('err');
          done();
        });
    });

    it('should return all templates with valid token', done => {
      request(app)
        .get('/api/templates')
        .set({ Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);
          const templates = await Template.find();

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('Templates loaded successfully');

          expect(templates.length).to.eql(storedTemplates.length);
          expect(templates[0].name).to.eql(storedTemplates[0].name);
          expect(templates[1].url).to.eql(storedTemplates[1].url);
          done();
        });
    });
  });
});
