
const sequelize = require('sequelize');
const dbConnection = require('../dbConnection');


class Level extends sequelize.Model {

  getName() {
    return this.name;
  };

  setName(value) {
    if(typeof value !== "string") {
      throw Error('Level.name must be a string');
    } else {
      this.name = value;
    }
  };

  getStatus() {
    return this.status;
  };

  setStatus(value) {
    if (!Number.isInteger(value)) {
      throw Error('Level.status must be an integer');
    } else {
      this.status = value;
    }
  };

};


Level.init({

  name: sequelize.STRING,
  status: sequelize.INTEGER
},{
 
  sequelize: dbConnection, 
  tableName: "levels",
  createdAt: "created_at", 
  updatedAt: "updated_at"
});


module.exports = Level;