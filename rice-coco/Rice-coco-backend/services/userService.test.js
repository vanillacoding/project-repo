const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');
const faker = require('faker');
const { getUserInfo } = require('./userService');

describe('UserRepository', () => {
  const stubValue = {
    _id: faker.random.uuid(),
    nickname: faker.name.findName(),
    gender: faker.name.gender(),
    email: faker.internet.email(),
    birthYear: faker.random.word(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    occupation: faker.random.word(),
    favoritePartners: faker.random.arrayElement(),
    history: faker.random.arrayElement(),
    promise: faker.random.number(),
    payment: faker.random.objectElement(),
    preferredPartner: faker.random.objectElement(),
  };

  describe('get user info', () => {
    it('should retrieve a user with specific id', async () => {
      const stub = sinon.stub(User, 'findOne').returns(stubValue);
      const user = await getUserInfo(stubValue._id);
      expect(stub.calledOnce).to.be.true;
      expect(user._id).to.equal(stubValue._id);
      expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.updatedAt).to.equal(stubValue.updatedAt);
    });
  });
});
