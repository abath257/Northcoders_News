const fspromises = require("fs/promises");

exports.fetchAllEndpoints = () => {
  return fspromises.readFile("./endpoints.json", "utf8").then((endpoints) => {
    return endpoints;
  });
};
