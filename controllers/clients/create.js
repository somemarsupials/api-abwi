const Client = require('../../database').models.client;

module.exports = async function(req, res, next, model = Client) {
  try {
    await model.create(req.body);
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(200);
};

