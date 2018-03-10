const Client = require('../../database').models.client;

module.exports = async function(req, res, next, model = Client) {
  try {
    await model.destroy({ where: { id: req.params.id }, cascade: true });
  } 
  catch (error) {
    return res.sendStatus(500);
  };

  return res.sendStatus(200);
};

