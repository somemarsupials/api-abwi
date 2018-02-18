'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    Item.belongsTo(models.Project, {
      onDelete: 'CASCADE';
    });
  };
  return Client;
};
