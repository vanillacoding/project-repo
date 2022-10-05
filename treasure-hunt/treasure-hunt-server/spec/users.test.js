const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/Users');
const Treasure = require('../models/Treasures');

describe('<POST /api/users/login>', function() {
  this.timeout(10000);
  it('should respond with token, userInfo If joined customer requests login', done => {
    request(app)
      .post('/api/users/login')
      .send({
        email: 'apple@gmail.com',
        picture_url: 'www.aeerk.com/efjeke/12kek4',
        name: 'apple'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async(err, res) => {
        if (err) return done(err);
        const { result, userInfo, token } = res.body;
        const secretKey = process.env.SECRET_KEY;
        const payload = await jwt.verify(token, secretKey);
        const { name, picture, iss } = payload;
        expect(result).to.eql('ok');
        expect(userInfo.name).to.eql('apple');
        expect(userInfo.picture).to.eql('www.aeerk.com/efjeke/12kek4');
        expect(name).to.eql('apple');
        expect(iss).to.eql('minsun');
        expect(picture).to.eql('www.aeerk.com/efjeke/12kek4');
        done();
      });
  });

  it('should add new user if non-joined user login, and should respond with token, userInfo.', done => {
    after(async() => {
      await User.deleteOne({ email: 'testcode@code.com' });
    });
    request(app)
      .post('/api/users/login')
      .send({
        email: 'testcode@code.com',
        picture_url: 'testcode@code.com/code',
        name: 'code'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async(err, res) => {
        if (err) return done(err);
        const { result, userInfo } = res.body;
        expect(result).to.eql('ok');
        const newUser = await User.findOne({ email: 'testcode@code.com' });
        expect(newUser.name).to.eql(userInfo.name);
        done();
      });
  });
});

describe('<POST /api/users/auth>', function() {
  this.timeout(10000);
  let token = '';
  before((done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: 'apple@gmail.com',
        picture_url: 'www.aeerk.com/efjeke/12kek4',
        name: 'apple'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });
  after(() => {
    token = '';
  });

  it('should respond with token and userInfo, userInfo If token is valid', done => {
    request(app)
      .post('/api/users/auth')
      .set('x-access-token', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).to.eql('ok');
        expect(res.body.token).to.eql(token);
        expect(res.body.userInfo.name).to.eql('apple');
        done();
      });
  });

  it('should respond "ng", If token is invalid', done => {
    request(app)
      .post('/api/users/auth')
      .set('x-access-token', 'invalid token')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(async(err, res) => {
        if (err) return done(err);
        expect(res.body.result).to.eql('ng');
        done();
      });
  });

  it('should respond "ng", If token is nothing', done => {
    request(app)
      .post('/api/users/auth')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).to.eql('ng');
        done();
      });
  });
});

describe('<ensureAuthenticated>', function() {
  let token = '';
  let userId = '';
  before((done) => {
    request(app)
      .post('/api/users/login')
      .send({
        email: 'apple@gmail.com',
        picture_url: 'www.aeerk.com/efjeke/12kek4',
        name: 'apple'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        userId = res.body.userInfo.id;
        done();
      });
  });
  after(() => {
    token = '';
    userId = '';
  });

  describe('<GET /api/users/:user_id/treasures>', function() {
    this.timeout(10000);
    it('should respond informaiton of treasures registered by logined user', done => {
      request(app)
        .get(`/api/users/${userId}/treasures`)
        .set('x-access-token', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const result = res.body.every((treasure) => treasure.name === 'registeredApple');
          expect(result).to.eql(true);
          done();
        });
    });
  
    it('should respond "ng", if userId is invalid', done => {
      request(app)
        .get('/api/users/invalid_userID/treasures')
        .set('x-access-token', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body.result).to.eql('ng');
          done();
        });
    });
  });

  describe('<GET /api/users/:user_id/huntings>', function() {
    this.timeout(10000);
    it('should respond informaiton of treasures hunted by logined user', done => {
      request(app)
        .get(`/api/users/${userId}/huntings`)
        .set('x-access-token', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(async(err, res) => {
          const result = res.body[0].id;
          const dbResult = await Treasure.findById(result);
          expect(dbResult.taken_by.toString()).to.eql(userId);
          done();
        });
    });
  
    it('should respond "ng", if userId is invalid', done => {
      request(app)
        .get('/api/users/invalid_userID/huntings')
        .set('x-access-token', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body.result).to.eql('ng');
          done();
        });
    });
  });
});
