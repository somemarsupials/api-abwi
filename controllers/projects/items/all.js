const Item = require('../../../database').models.item;

module.exports = async function(req, res, next, model = Item) {
  let data;

  try {
    // databaseQuery is created by middleware!
    let query = Object.assign(req.databaseQuery(model), { 
      projectId: req.params.projectId 
    });

    let items = await model.findAll({ where: query });
    data = items.map(async (item) => await item.json(req.query));
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return Promise.all(data).then(data => res.json(data));
};

