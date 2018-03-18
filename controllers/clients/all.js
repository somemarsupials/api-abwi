const Client = require('../../database').models.client;

module.exports = async function(req, res, next, model = Client) {
  let data;

  try {
    // databaseQuery is created by middleware!
    let clients = await model.findAll({ where: req.databaseQuery(model) });
    data = clients.map(async (client) => await client.json(req.query));
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return Promise.all(data).then(data => res.json(data));
};

