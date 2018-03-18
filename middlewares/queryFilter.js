module.exports = function(req, res, next) {

  // ability to quickly pick query parameters

  req.filterQuery = function(attrs) {
    let params = {}; 

    attrs.forEach((attr) => {
      if (req.query[attr]) {
        params[attr] = req.query[attr];
      };
    });

    return params;
  };

  // pick query parameters from model fields

  req.databaseQuery = function(model) {
    return req.filterQuery(Object.keys(model.attributes));
  };

  next();
};
