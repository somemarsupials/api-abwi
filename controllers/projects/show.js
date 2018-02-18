const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  try {
    let project = await model.find({ id: req.params.id });
    return res.json(await project.json());
  } 
  catch (error) {
    return res.sendStatus(500);
  };
};

