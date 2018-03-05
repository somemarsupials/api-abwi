const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  let project;

  try {
    project = await model.find({ where: { id: req.params.id } });
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  if (project) {
    return res.json(await project.json(req.query));
  }
  else {
    return res.sendStatus(404);
  };

};

