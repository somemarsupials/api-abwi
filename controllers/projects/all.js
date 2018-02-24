const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  let data;

  try {
    let projects = await model.findAll();
    data = projects.map(async (project) => await project.json());
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return Promise.all(data).then(data => res.json(data));
};

