const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  let item;

  try {
    item = await model.find(
      { where: { projectId: req.params.projectId, id: req.params.id } }
    );
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  if (item) {
    return res.json(await item.json(req.query));
  }
  else {
    return res.sendStatus(404);
  };

};

