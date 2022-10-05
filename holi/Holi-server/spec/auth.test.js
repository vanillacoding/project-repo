require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');

/* 
  Login User
*/

describe('POST /api/auth/login', function () {
  const secret = process.env.JWT_SECRET_KEY;
  this.timeout(10000);

  after((done) => {
    token = null;
    done();
  });

  it('When user tries to log in, should be issue user information and token', (done) => {
    const userData = {
      email: 'tony_bukpbmd_stark@tfbnw.net',
      picture_url: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&_nc_sid=f72489&_nc_ohc=OXNTz1yaVz8AX_FI6lR&_nc_ht=scontent-gmp1-1.xx&oh=c0ebac99f39064799ccf8924529d04da&oe=5EBB7738',
      name: 'Tony Stark'
    };

    request(app)
      .post('/api/auth/login')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        const user = await User.findOneByEmail({ email: userData.email });
        const { _id, email, name } = user;
        const token = await jwt.sign({ _id, email, name }, secret, {
          expiresIn: '7d',
          issuer: 'davinjeong',
          subject: 'userInfo',
        });

        expect(res.body.email).to.eql(email);
        expect(res.body.token).to.eql(token);

        done();
      });
  });
});
