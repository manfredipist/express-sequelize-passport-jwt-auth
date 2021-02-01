const Sequelize = require("sequelize");
const config = require("../config/");

const sequelize = new Sequelize(config.mariadb_db, config.mariadb_user, config.mariadb_password, {
  host: config.mariadb_host,
  port: config.mariadb_port,
  dialect: "mariadb",
  //operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  define: {
    freezeTableName: true,
    underscored: true
  }
});

var initModels = require("./init-models");
var models = initModels(sequelize);

var dbConnection = {}
dbConnection.sequelize = sequelize;

module.exports.dbConnection = dbConnection;
module.exports.models = models;