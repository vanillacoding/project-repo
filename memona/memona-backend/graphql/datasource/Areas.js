const { MongoDataSource } = require("apollo-datasource-mongodb");

class Areas extends MongoDataSource {
  //todo. 아래 메서드들도 상속?
  getAreas() {
    return this.model.find();
  }
  getArea(id) {
    return this.findOneById(id);
  }
  getAreaByQuery(query) {
    return this.model.findOne(query);
  }
  getAreasByIds(ids) {
    return this.findManyByIds(ids);
  }
  createArea(area) {
    return this.model.create(area);
  }
}

module.exports = Areas;
