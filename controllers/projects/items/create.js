const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  try {
    await model.create(Object.assign(req.body, { 
      projectId: req.params.projectId 
    }));
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(200);
};

