const request = require('supertest');
const mongoose = require('mongoose');
const { expect } = require('chai');
const _ = require('lodash');

const app = require('../app');
const User = require('../models/User');
const Photo = require('../models/Photo');

describe('POST /api/auth/login', () => {
  const loginInfo = {
    user_id: 'test1user',
    password: 'test1password'
  };
  it('should respond with template', done => {
    request(app)
      .post('/api/auth/login')
      .send(loginInfo)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.user).to.exist;
        expect(res.body.token).to.exist;
        expect(res.body.photos).to.exist;
        expect(res.body.user.user_name).to.eql('test1name');

        done();
      });
  });
});

describe('POST /api/auth/signup', () => {
  const signupInfo = {
    user_id: 'test2user',
    user_name: 'test2name',
    password: 'test2password',
    passwordCheck: 'test2password'
  };

  it('should respond with template', done => {
    request(app)
      .post('/api/auth/signup')
      .send(signupInfo)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        const createdUser = await User.findOne({ user_id: 'test2user' });

        expect(createdUser).to.exist;
        await User.findByIdAndRemove(createdUser._id);

        done();
      });
  });
});

describe('PUT /api/users/follow /api/users/unfollow', () => {
  it('should add ObjectId to followers, followings array', done => {
    request(app)
      .put('/api/users/follow')
      .send({
        user_id: '5e9848125a322497953f7316',
        followee_id: '5e9842d7565c3e9310e4bb68'
      })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const user1 = await User.findOne({ user_id: 'test1user' });
        const user2 = await User.findOne({ user_id: 'test3user' });

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        expect(user1.followings).to.includes(user2._id);
        expect(user2.followers).to.includes(user1._id);

        done();
      });
  });

  it('should respond with template', done => {
    request(app)
      .put('/api/users/unfollow')
      .send({
        user_id: '5e9848125a322497953f7316',
        followee_id: '5e9842d7565c3e9310e4bb68'
      })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const user1 = await User.findOne({ user_id: 'test1user' });
        const user2 = await User.findOne({ user_id: 'test3user' });

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        expect(user1.followings).to.not.includes(user2._id);
        expect(user2.followers).to.not.includes(user1._id);

        done();
      });
  });
});

describe('GET /api/users/:user_id/search', () => {
  it('should find users by user_id', done => {
    request(app)
      .get('/api/users/test1user/search?keyword=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(!!_.find(res.body, { user_id: 'test3user' })).to.eql(true);
        done();
      });
  });
});

describe('GET /api/users/:user_id/photos', () => {
  it('should find users by user_id', done => {
    request(app)
      .get('/api/users/5e9848125a322497953f7316/photos')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        done();
      });
  });
});

describe('POST/PUT/DELETE /api/users/:user_id/portraits', () => {
  const date = Date.now();
  let portrait_id = '';

  it('should save portrait and get result', done => {
    request(app)
      .post('/api/users/5e9848125a322497953f7316/portraits')
      .send({ faceType: { face: 0, eyes: 0 }, date })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        portrait_id = res.body.portrait_id;
        done();
      });
  });

  it('should update portrait and get result', done => {
    request(app)
      .put(`/api/users/${portrait_id}/portraits`)
      .send({ faceType: { face: 1, eyes: 1 }, date })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        done();
      });
  });

  it('should delete portrait and get result', done => {
    request(app)
      .delete(`/api/users/5e9848125a322497953f7316/portraits`)
      .send({ portrait_id })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        done();
      });
  });
});

describe('PUT /api/users/:_id/like/:portrait_id', () => {
  it('should find users by user_id', done => {
    request(app)
      .put('/api/users/5e9842d7565c3e9310e4bb68/like/5e985487323e05a7bebd02aa')
      .send({ owner_id: '5e9848125a322497953f7316' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        done();
      });
  });
});

describe('PUT /api/users/:_id/unlike/:portrait_id', () => {
  it('should find users by user_id', done => {
    request(app)
      .put('/api/users/5e9842d7565c3e9310e4bb68/unlike/5e985487323e05a7bebd02aa')
      .send({ owner_id: '5e9848125a322497953f7316' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.result).to.exist;
        expect(res.body.result).to.eql('ok');

        done();
      });
  });
});
