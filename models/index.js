'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _event = require("./event");
const {DataTypes} = require("sequelize");
const _present = require("./present");
const _user = require("./user");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.present.belongsTo(db.event, { as: "event_event", foreignKey: "event"});
db.event.hasMany(db.present, { as: "presents", foreignKey: "event"});
db.user_event.belongsTo(db.event, { as: "id_event_event", foreignKey: "id_event"});
db.event.hasMany(db.user_event, { as: "user_events", foreignKey: "id_event"});
db.present.belongsTo(db.user, { as: "user_user", foreignKey: "user"});
db.user.hasMany(db.present, { as: "presents", foreignKey: "user"});
db.user.belongsTo(db.user, { as: "parent", foreignKey: "parent_id"});
db.user.hasMany(db.user, { as: "users", foreignKey: "parent_id"});
db.user_event.belongsTo(db.user, { as: "id_user_user", foreignKey: "id_user"});
db.user.hasMany(db.user_event, { as: "user_events", foreignKey: "id_user"});

module.exports = db;
