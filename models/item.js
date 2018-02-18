'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    description: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Project);
  };
  return Item;
};
