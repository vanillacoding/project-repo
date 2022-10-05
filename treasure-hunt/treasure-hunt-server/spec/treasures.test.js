const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Treasure = require('../models/Treasures');

describe('<ensureAuthenticated>', function() {
  this.timeout(10000);
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

  describe('<GET /api/treasures>', function() {
    this.timeout(10000);
    describe('should respond informaiton of treasures (Only is_huting is false, expiration is valid)', function() {
      it('Case1) Country=all, Category=all', done => {
        request(app)
          .get('/api/treasures?country=all&category=all')
          .set('x-access-token', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const is_huntingResult = res.body.every((treasure) => treasure.is_hunting === false);
            const expirationResult = res.body.every((treasure) => treasure.expiration > new Date());
            expect(is_huntingResult).to.eql(true);
            expect(expirationResult).to.eql(true);
            done();
          });
      });

      it('Case2) Country=<selected>, Category=all>', done => {
        request(app)
          .get('/api/treasures?country=Vietnam&category=all')
          .set('x-access-token', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            const is_huntingResult = res.body.every((treasure) => treasure.is_hunting === false);
            const expirationResult = res.body.every((treasure) => treasure.expiration > new Date());
            const countryResult = res.body.every((treasure) => treasure.country === 'Vietnam');
            expect(is_huntingResult).to.eql(true);
            expect(expirationResult).to.eql(true);
            expect(countryResult).to.eql(true);
            done();
          });
      });

      it('Case3) Country=all, Category=<selected>>', done => {
        request(app)
          .get('/api/treasures?country=all&category=usim')
          .set('x-access-token', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(async(err, res) => {
            const is_huntingResult = res.body.every((treasure) => treasure.is_hunting === false);
            const expirationResult = res.body.every((treasure) => treasure.expiration > new Date());
            const categoryResult = await Treasure.findById(res.body[0].id);
            expect(is_huntingResult).to.eql(true);
            expect(expirationResult).to.eql(true);
            expect(categoryResult.category).to.eql('usim');
            done();
          });
      });
    });
  });

  describe('<POST /api/treasures> + <DELETE /api/treasures/:treasure_id>', function() {
    this.timeout(10000);
    const filepath1 = `${__dirname}/images/example1.jpg`;
    const filepath2 = `${__dirname}/images/example2.jpg`;
    const filepath3 = `${__dirname}/images/example3.jpg`;
    const expiration = new Date().getTime() + 100000000;

    it('should save new treasure, and should delete selected treasure', done => {
      request(app)
        .post('/api/treasures')
        .set('x-access-token', `Bearer ${token}`)
        .field('Content-Type', 'multipart/form-data')
        .field('country', 'Korea')
        .field('category', 'usim')
        .field('name', 'test')
        .field('expiration', expiration)
        .field('latitude', 30)
        .field('longitude', 100)
        .field('description', 'test description')
        .field('is_hunting', false)
        .attach('img', filepath1, 'exampe1')
        .attach('img', filepath2, 'exampl2')
        .attach('img', filepath3, 'exampl3')
        .expect(201)
        .end(async(err, res) => {
          expect(res.body.result).to.eql('ok');
          const newTreasure = await Treasure.findById(res.body.id);
          expect(newTreasure.country).to.eql('Korea');
          expect(newTreasure.name).to.eql('test');

          request(app)
            .delete(`/api/treasures/${newTreasure._id}`)
            .set('x-access-token', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
              expect(res.body.result).to.eql('ok');
              done();
            });
        });
    });
  });

  describe('<GET /api/treasures/:treasure_id>', function() {
    this.timeout(10000);
    const treasureId = '5e95a3ce7124a534dfed2c6f';
    it('should response a information of selected treasure', done => {
      request(app)
        .get(`/api/treasures/${treasureId}`)
        .set('x-access-token', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.registered_by.name).to.eql('apple');
          expect(res.body.name).to.eql('registeredApple');

          done();
        });
    });

    it('should response "ng" if treasure id is invalid', done => {
      request(app)
        .get('/api/treasures/invalidTreasureId')
        .set('x-access-token', `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body.result).to.eql('ng');
          done();
        });
    });
  });

  describe('<PUT /api/treasures/:treasure_id>', function() {
    this.timeout(10000);
    const treasureId = '5e954c6908f8a4efef4594c3';
    after(async() => {
      const treasure = await Treasure.findById({ _id: treasureId });
      treasure.is_hunting = false;
      await treasure.save();
    });

    it('should update a information of selected treasure if user hunt.', done => {
      request(app)
        .put(`/api/treasures/${treasureId}`)
        .set('x-access-token', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.is_hunting).to.eql(true);
          expect(res.body.taken_by).to.eql(userId);
          done();
        });
    });

    it('should response "ng" if treasure id is invalid', done => {
      request(app)
        .put('/api/treasures/invalidTreasureId')
        .set('x-access-token', `Bearer ${token}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body.result).to.eql('ng');
          done();
        });
    });
  });
});
