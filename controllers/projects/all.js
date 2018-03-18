const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  let data;

  try {
    // databaseQuery is created by middleware!
    let projects = await model.findAll({ where: req.databaseQuery(model) });
    data = projects.map(async (project) => await project.json(req.query));
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return Promise.all(data).then(data => res.json(data));
};

