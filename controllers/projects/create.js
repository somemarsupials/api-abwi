const Project = require('../../database').models.project;

module.exports = async function(req, res, next, model = Project) {
  try {
    await model.create(req.body);
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(200);
};

