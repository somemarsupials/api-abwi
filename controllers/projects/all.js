const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  try {
    let projects = await model.findAll();
    let data = projects.map(async (project) => await project.json());
    return Promise.all(data).then(data => res.json(data));
  } 
  catch (error) {
    return res.sendStatus(500);
  };
};

