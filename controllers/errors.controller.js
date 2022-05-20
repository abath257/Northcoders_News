exports.handleRootPathErrors = ((req, res) => {
  res.status(404).send({ msg: "Not Found" });
});

exports.handleCustomErrors = ((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

exports.handlePSQLErrors =((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23502") {
    res.status(422).send({ msg: "Incorrect Input" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Route not Found" });
  }else {
    next(err);
  }
});