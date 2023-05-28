const { MongoDataSource } =  require('apollo-datasource-mongodb');

class UserAPI extends MongoDataSource {
 initialize(config){
    super.initialize(config)
 }
  
}

module.exports = UserAPI