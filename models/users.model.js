const db = require("../db/index.js");

exports.fetchAllUsers = () => {
  return db.query("SELECT username FROM users").then((data) => {
    const usersArr = data.rows;
    return usersArr;
  });
};

exports.fetchUserByUsername = (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((data) => {
      const user = data.rows[0];
      if (!user) {
        return Promise.reject({ status: 404, msg: "Route Not Found" });
      }
      return user;
    });
};
