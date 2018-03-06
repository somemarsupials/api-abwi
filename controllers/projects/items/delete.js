const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  let { projectId, id } = req.params;

  try {
    await model.destroy({ where: { id: id, projectId: projectId } });
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(200);
};

