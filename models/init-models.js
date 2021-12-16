let DataTypes = require("sequelize").DataTypes;
let _event = require("./event");
let _present = require("./present");
let _user = require("./user");
let _user_event = require("./user_event");

function initModels(sequelize) {
  let event = _event(sequelize, DataTypes);
  let present = _present(sequelize, DataTypes);
  let user = _user(sequelize, DataTypes);
  let user_event = _user_event(sequelize, DataTypes);

  present.belongsTo(event, { as: "event_event", foreignKey: "event"});
  event.hasMany(present, { as: "presents", foreignKey: "event"});
  user_event.belongsTo(event, { as: "id_event_event", foreignKey: "id_event"});
  event.hasMany(user_event, { as: "user_events", foreignKey: "id_event"});
  present.belongsTo(user, { as: "user_user", foreignKey: "user"});
  user.hasMany(present, { as: "presents", foreignKey: "user"});
  user.belongsTo(user, { as: "parent", foreignKey: "parent_id"});
  user.hasMany(user, { as: "users", foreignKey: "parent_id"});
  user_event.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(user_event, { as: "user_events", foreignKey: "id_user"});

  return {
    event,
    present,
    user,
    user_event,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
