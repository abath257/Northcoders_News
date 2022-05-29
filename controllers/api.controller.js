const { fetchAllEndpoints } = require("../models/api.model.js");

exports.getAllEndpoints = (req, res) => {
  fetchAllEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};
