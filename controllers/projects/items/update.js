const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  let item;

  try {
    item = await model.find(
      { where: { id: req.params.id, projectId: req.params.projectId } }
    );
    if (item) {
      await item.update(req.body);
    };
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(item ? 200 : 404);
};

