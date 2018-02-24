const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  let project;

  try {
    project = await model.find({ where: { id: req.params.id } });
    if (project) {
      await project.update(req.body);
    };
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(project ? 200 : 404);
};

