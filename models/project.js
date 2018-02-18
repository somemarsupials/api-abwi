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
    this.total = items.reduce((sum, item) => sum + item.value, 0);
  };

  return Project;
};
