'use strict';
module.exports = (sequelize, DataTypes) => {

  var Project = sequelize.define('Project', {
    title: DataTypes.STRING
  }, {});

  Project.associate = function(models) {
    Project.hasMany(models.item);
    Project.hasMany(models.client);
  };

  Project.prototype.getTotal = async function() {
    let items = await this.getItems();
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  Project.prototype.json = async function() {
    this.dataValues.total = await this.getTotal();
    return this.dataValues;
  };

  return Project;
};
