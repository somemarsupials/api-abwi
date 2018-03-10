const Client = require('../../database').models.client;

module.exports = async function(req, res, next, model = Client) {
  let client;

  try {
    client = await model.find({ where: { id: req.params.id } });
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  if (client) {
    return res.json(await client.json(req.query));
  }
  else {
    return res.sendStatus(404);
  };

};

