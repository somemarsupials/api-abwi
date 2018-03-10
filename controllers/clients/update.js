const Client = require('../../database').models.client;

module.exports = async function(req, res, next, model = Client) {
  let client;

  try {
    client = await model.find({ where: { id: req.params.id } });
    if (client) {
      await client.update(req.body);
    };
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(client ? 200 : 404);
};

