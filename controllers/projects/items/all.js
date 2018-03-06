const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  let data;

  try {
    let items = await model.findAll({ 
      where: { projectId: req.params.projectId } 
    });
    data = items.map(async (item) => await item.json(req.query));
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return Promise.all(data).then(data => res.json(data));
};

