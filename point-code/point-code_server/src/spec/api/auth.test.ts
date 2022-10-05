import request from 'supertest';
import User from '../../models/User';
import app from '../../app';

const serializedTestUser = {
  avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
  solved_problems: [],
  total_point: 0,
  _id: '5e979d7646645630c470fbab',
  name: 'test',
  email: 'test@gmail.com',
  tried_submissions: [],
  created_at: '2020-04-15T23:49:10.653Z',
  updated_at: '2020-04-15T23:49:10.653Z',
  __v: 0
};

describe('GET /api/auth/user', () => {
  it('should throw 401 error to invalid user', done => {
    request(app)
      .get('/api/auth/user')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should load user JSON to valid user', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/auth/user')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual(serializedTestUser);
            done();
          });
      });
  });
});

describe('POST /api/auth/signup', () => {
  afterAll(async () => {
    await User.findOneAndDelete({ name: 'test2' });
  });

  it('should throw 400 error when incorrect request', done => {
    request(app)
      .post('/api/auth/signup')
      .send({ name: 'te', email: 'te@gmail', password: 'rm', confirmation: 'rntm' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: '"name" length must be at least 3 characters long' });
        done();
      });
  });

  it('should throw 409 error when already existing name or email', done => {
    request(app)
      .post('/api/auth/signup')
      .send({ name: 'test', email: 'test@gmail.com', password: 'rntmrntm', confirmation: 'rntmrntm' })
      .expect('Content-Type', /json/)
      .expect(409)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Conflict' });
        done();
      });
  });

  it('should create user when correct request', done => {
    request(app)
      .post('/api/auth/signup')
      .send({ name: 'test2', email: 'test2@gmail.com', password: 'rntmrntm', confirmation: 'rntmrntm' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const newUser = await User.findByName('test2');
        if (!newUser) return done('creation failed');

        done();
      });
  });
});

describe('POST /api/auth/login', () => {
  it('should throw 400 error when incorrect request', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'te@gmail', password: 'rm' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: '"email" must be a valid email' });
        done();
      });
  });

  it('should throw 401 error when non-existing email', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'undefined@gmail.com', password: 'rntmrntm' })
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should throw 401 error when don\'t match password', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'undefined' })
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should login when correct request', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(serializedTestUser);
        done();
      });
  });
});

describe('POST /api/auth/logout', () => {
  it('should respond with initialized cookie', done => {
    request(app)
      .post('/api/auth/logout')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['set-cookie'][0]).toBe('access_token=; Path=/');
        done();
      });
  });
});
