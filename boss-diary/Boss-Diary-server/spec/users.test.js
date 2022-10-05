const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');

const User = require('../models/User');
const Report = require('../models/Report');
const Template = require('../models/Template');

require('dotenv').config();

describe('/api/users', function() {
  this.timeout(20000);
  const mongoose = require('mongoose');
  const db = mongoose.connection;

  const mockTemplates = require('./templates.json');

  let userA;
  let userB;
  let accessTokenA;
  let accessTokenB;
  let reportA;
  let storedTemplates;

  const createUsers = async() => {
    userA = await new User({
      email: 'test@test.com',
      name: 'testA',
      profile_photo: 'http://ddd',
      resports: [],
      templates: [],
      approval_requests: []
    }).save();


    userB = await new User({
      email: 'example@example.com',
      name: 'testB',
      profile_photo: 'http://ddd',
      resports: [],
      templates: [],
      approval_requests: []
    }).save();

    accessTokenA = jwt.sign(
      {
        email: 'test@test.com',
        name: 'testA',
        user_id: userA._id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );

    accessTokenB = jwt.sign(
      {
        email: 'example@example.com',
        name: 'testB',
        user_id: userB._id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    );
  };

  const createReport = async() => {
    reportA = await new Report({
      created_by: userB._id,
      title: 'test',
      body: 'test body',
      url: 'http://',
      template_id: mockTemplates[0]._id,
      approval_requests: []
    }).save();

    await User.updateOne(
      {
        _id: userB._id
      },
      {
        $addToSet: { reports : reportA._id },
        $inc: { points: 5 }
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

      Report.deleteMany({}, err => {
        if (err) return done(err);

        Template.deleteMany({}, err => {
          if (err) return done(err);

          done();
        });
      });
    });
  };

  before(done => {
    (async function checkDatabaseConnection() {
      if (db.readyState === 1) {
        await createUsers();
        await createReport();
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

  Get User Data

  */

  describe('GET /users/:user_id', () => {
    it('should not get user data with invalid token', done => {
      request(app)
        .get(`/api/users/${userA._id}`)
        .set({ Authorization: 'Bearer fake', 'Content-Type': 'application/json' })
        .expect(500)
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.exist;
          expect(res.body.result).to.eql('err');

          done();
        });
    });

    it('should get user data with valid token', done => {
      request(app)
        .get(`/api/users/${userA._id}`)
        .set({ Authorization: `Bearer ${accessTokenA}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('User found successfully');

          const user = await User.findById(userA._id);

          expect(user).to.exist;
          expect(user.name).to.eql(userA.name);
          expect(user.email).to.eql(userA.email);
          expect(user.profile_photo).to.eql(userA.profile_photo);

          done();
        });
    });

    it('should get user data with user email', done => {
      request(app)
        .get(`/api/users/email/${userB.email}`)
        .set({ Authorization: `Bearer ${accessTokenA}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('User found successfully');

          const user1 = await User.findOne({ email: userB.email });
          const user2 = await User.findById(userB._id);

          expect(user1).to.exist;
          expect(user1.name).to.eql(user2.name);
          expect(user1.email).to.eql(user2.email);
          expect(user1.profile_photo).to.eql(user2.profile_photo);

          done();
        });
    });
  });

  /*

  Get User Reports

  */

  describe('GET /users/:user_id/reports', () => {
    it('should return empty array when user has no reports', done => {
      request(app)
        .get(`/api/users/${userA._id}/reports`)
        .set({ Authorization: `Bearer ${accessTokenA}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('User reports loaded successfully');

          const user = await User.findById(userA._id);
          const reports = await Report.find({ created_by: userA._id });

          expect(reports.length).to.eql(0);
          expect(reports.length).to.eql(user.reports.length);
          done();
        });
    });

    it('should return user reports', done => {
      request(app)
        .get(`/api/users/${userB._id}/reports`)
        .set({ Authorization: `Bearer ${accessTokenB}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('User reports loaded successfully');

          const user = await User.findById(userB._id);
          const reports = await Report.find({ created_by: userB._id });

          expect(reports.length).to.not.eql(0);
          expect(reports.length).to.eql(user.reports.length);
          done();
        });
    });
  });

  /*

  Update User Templates

  */

  describe('PUT /api/users/:user_id/templates', () => {
    it('should not add any templates with invalid token', done => {
      request(app)
        .put(`/api/users/${userA._id}/templates`)
        .set({ Authorization: 'Bearer fake', 'Content-Type': 'application/json' })
        .send({ templateId: storedTemplates[0]._id, price: storedTemplates[0].points })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.exist;
          expect(res.body.result).to.eql('err');
          done();
        });
    });

    it('should add user templates with valid token', done => {
      request(app)
        .put(`/api/users/${userA._id}/templates`)
        .set({ Authorization: `Bearer ${accessTokenA}`, 'Content-Type': 'application/json' })
        .send({ templateId: storedTemplates[0]._id, price: storedTemplates[0].points })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('Template added successfully');

          const user = await User.findById(userA._id).populate('templates');
          const template = await Template.findById(storedTemplates[0]._id);

          expect(user.templates.length).to.eql(1);
          expect(user.templates[0].name).to.eql(template.name);
          done();
        });
    });
  });

  /*

  Get User Templates

  */

  describe('GET /api/users/:user_id/templates', () => {
    it('should not return any templates with invalid token', done => {
      request(app)
        .get(`/api/users/${userA._id}/templates`)
        .set({ Authorization: 'Bearer fake', 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.exist;
          expect(res.body.result).to.eql('err');
          done();
        });
    });

    it('should return all templates user has with valid token', done => {
      request(app)
        .get(`/api/users/${userA._id}/templates`)
        .set({ Authorization: `Bearer ${accessTokenA}`, 'Content-Type': 'application/json' })
        .end(async(err, res) => {
          if (err) return done(err);
          const userTemplate = res.body.templates[0];
          const template = await Template.findById(userTemplate._id);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('User templates loaded successfully');

          expect(template).to.exist;
          expect(userTemplate.name).to.eql(template.name);

          done();
        });
    });
  });
});
