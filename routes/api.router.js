const apiRouter = require("express").Router();
const { getAllEndpoints } = require("../controllers/api.controller");
const topicsRouter = require("./topics.router");
const commentsRouter = require("./comments.router");
const userRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const {
  handleRootPathErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("../controllers/errors.controller.js");

apiRouter.get("/", getAllEndpoints);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.get("/*", handleRootPathErrors);
apiRouter.use(handleCustomErrors);
apiRouter.use(handlePSQLErrors);

module.exports = apiRouter;
