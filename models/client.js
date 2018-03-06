'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('client', {
    name: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    Client.hasMany(models.project, { onDelete: 'cascade' });
  };
  return Client;
};
