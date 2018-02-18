'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project', {
    title: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.hasMany(models.Item);
    Project.hasMany(models.Client);
  };
  return Project;
};
