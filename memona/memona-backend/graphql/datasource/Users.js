const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  getUsers() {
    return this.model.find();
  }
  getUser(id) {
    return this.findOneById(id);
  }
  getUserByQuery(query) {
    return this.model.findOne(query);
  }
  getUsersByIds(ids) {
    return this.findManyByIds(ids);
  }
  createUser(user) {
    return this.model.create(user);
  }
}

module.exports = Users;
