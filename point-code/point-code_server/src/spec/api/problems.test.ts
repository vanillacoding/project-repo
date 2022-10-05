import request from 'supertest';
import Problem from '../../models/Problem';
import app from '../../app';

describe('GET /api/problems', () => {
  it('should throw 400 error when page less than 1', done => {
    request(app)
      .get('/api/problems?page=0')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Bad Request' });
        done();
      });
  });

  it('should read problems', async done => {
    const problems = await Problem.find().limit(6);
    const pageCount = await Problem.countDocuments();

    request(app)
      .get('/api/problems')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['last-page']).toBe(String(Math.ceil(pageCount / 6)));
        expect(res.body).toEqual(JSON.parse(JSON.stringify(problems)));
        done();
      });
  });
});

describe('GET /api/problems/:problem_id', () => {
  it('should throw 401 error to invalid user', done => {
    request(app)
      .get('/api/problems/5e91ae6f6e301e3164a2f0ca')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should throw 400 error when problem id is not ObjectID', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/52342325226')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Bad Request' });
            done();
          });
      });
  });

  it('should throw 404 error when problem does not exist', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/5e91ae6f6e301e3164a2f0cb')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Not Found' });
            done();
          });
      });
  });

  it('should read problem', async done => {
    const problem = await Problem.findById('5e91ae6f6e301e3164a2f0ca');

    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/5e91ae6f6e301e3164a2f0ca')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual(JSON.parse(JSON.stringify(problem)));
            done();
          });
      });
  });
});

describe('PUT /api/problems/:problem_id', () => {
  it('should throw 401 error to invalid user', done => {
    request(app)
      .put('/api/problems/5e91ae6f6e301e3164a2f0ca')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should throw 400 error when problem id is not ObjectID', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .put('/api/problems/52342325226')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Bad Request' });
            done();
          });
      });
  });

  it('should throw 404 error when problem does not exist', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .put('/api/problems/5e91ae6f6e301e3164a2f0cb')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Not Found' });
            done();
          });
      });
  });

  it('should throw 400 error when incorrect request', done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .put('/api/problems/5e91ae6f6e301e3164a2f0ca')
          .send({ userCode: 1 })
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: '"userCode" must be a string' });
            done();
          });
      });
  });
});

describe('GET /api/problems/:problem_id/solutions', () => {
  it('should throw 401 error to invalid user', done => {
    request(app)
      .get('/api/problems/5e91ae6f6e301e3164a2f0ca/solutions')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: 'Unauthorized' });
        done();
      });
  });

  it('should throw 400 error when problem id is not ObjectID', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/52342325226/solutions')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Bad Request' });
            done();
          });
      });
  });

  it('should throw 404 error when problem does not exist', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/5e91ae6f6e301e3164a2f0cb/solutions')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Not Found' });
            done();
          });
      });
  });

  it('should throw 401 error when as yet unsolved', async done => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@gmail.com', password: 'rntmrntm' })
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get('/api/problems/5e91ae6f6e301e3164a2f0ca/solutions')
          .set('Cookie', res.header['set-cookie'][0])
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err2, res2) => {
            if (err2) return done(err2);
            expect(res2.body).toEqual({ message: 'Unauthorized' });
            done();
          });
      });
  });
});
