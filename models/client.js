'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('client', {
    name: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    Client.belongsTo(models.project, {
      onDelete: 'CASCADE'
    });
  };
  return Client;
};
